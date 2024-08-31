use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;

declare_id!("GERZ7aGf8eVmLBpA1hoFJx2AnZXUKxmwYdQqoTdbPPND");

#[program]
pub mod ledgerdrive {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.owner = ctx.accounts.user.key();
        user_account.root_folder = ctx.accounts.root_folder.key();
        user_account.storage_used = 0;
        user_account.file_count = 0;
        user_account.folder_count = 1; // Root folder

        let root_folder = &mut ctx.accounts.root_folder;
        root_folder.owner = ctx.accounts.user.key();
        root_folder.name = "Root".to_string();
        root_folder.parent_folder = Pubkey::default(); // Root folder has no parent
        root_folder.created_at = Clock::get()?.unix_timestamp;
        root_folder.updated_at = Clock::get()?.unix_timestamp;
        root_folder.is_shared = false;

        emit!(UserInitialized {
            user: user_account.key(),
            root_folder: root_folder.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn create_folder(ctx: Context<CreateFolder>, name: String) -> Result<()> {
        require!(name.len() <= MAX_NAME_LENGTH, DriveError::NameTooLong);
        let folder = &mut ctx.accounts.folder;
        let user_account = &mut ctx.accounts.user_account;

        folder.owner = ctx.accounts.user.key();
        folder.name = name;
        folder.parent_folder = ctx.accounts.parent_folder.key();
        folder.created_at = Clock::get()?.unix_timestamp;
        folder.updated_at = Clock::get()?.unix_timestamp;
        folder.is_shared = false;

        user_account.folder_count = user_account
            .folder_count
            .checked_add(1)
            .ok_or(DriveError::Overflow)?;

        emit!(FolderCreated {
            folder: folder.key(),
            owner: folder.owner,
            name: folder.name.clone(),
            parent_folder: folder.parent_folder,
            timestamp: folder.created_at,
        });

        Ok(())
    }

    pub fn upload_file(
        ctx: Context<UploadFile>,
        name: String,
        file_type: String,
        size: u64,
        ipfs_cid: String,
    ) -> Result<()> {
        require!(name.len() <= MAX_NAME_LENGTH, DriveError::NameTooLong);
        require!(
            file_type.len() <= MAX_FILE_TYPE_LENGTH,
            DriveError::InvalidFileType
        );
        require!(
            ipfs_cid.len() <= MAX_IPFS_CID_LENGTH,
            DriveError::InvalidIpfsCid
        );

        let user_account = &mut ctx.accounts.user_account;
        let new_storage = user_account
            .storage_used
            .checked_add(size)
            .ok_or(DriveError::StorageOverflow)?;
        require!(
            new_storage <= MAX_STORAGE_PER_USER,
            DriveError::StorageLimitExceeded
        );

        let file = &mut ctx.accounts.file;

        file.owner = ctx.accounts.user.key();
        file.name = name;
        file.file_type = file_type;
        file.size = size;
        file.ipfs_cid = ipfs_cid;
        file.folder = ctx.accounts.folder.key();
        file.created_at = Clock::get()?.unix_timestamp;
        file.updated_at = Clock::get()?.unix_timestamp;
        file.is_shared = false;

        user_account.file_count = user_account
            .file_count
            .checked_add(1)
            .ok_or(DriveError::Overflow)?;
        user_account.storage_used = new_storage;

        emit!(FileUploaded {
            file: file.key(),
            owner: file.owner,
            name: file.name.clone(),
            size: file.size,
            folder: file.folder,
            ipfs_cid: file.ipfs_cid.clone(),
            timestamp: file.created_at,
        });

        Ok(())
    }

    pub fn update_file(
        ctx: Context<UpdateFile>,
        name: Option<String>,
        ipfs_cid: Option<String>,
        new_folder: Option<Pubkey>,
    ) -> Result<()> {
        let file = &mut ctx.accounts.file;

        if let Some(new_name) = name {
            require!(new_name.len() <= MAX_NAME_LENGTH, DriveError::NameTooLong);
            file.name = new_name;
        }

        if let Some(new_ipfs_cid) = ipfs_cid {
            require!(
                new_ipfs_cid.len() <= MAX_IPFS_CID_LENGTH,
                DriveError::InvalidIpfsCid
            );
            file.ipfs_cid = new_ipfs_cid;
        }

        if let Some(folder) = new_folder {
            file.folder = folder;
        }

        file.updated_at = Clock::get()?.unix_timestamp;

        emit!(FileUpdated {
            file: file.key(),
            name: file.name.clone(),
            folder: file.folder,
            ipfs_cid: file.ipfs_cid.clone(),
            timestamp: file.updated_at,
        });

        Ok(())
    }

    pub fn delete_file(ctx: Context<DeleteFile>) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let file = &ctx.accounts.file;

        user_account.file_count = user_account
            .file_count
            .checked_sub(1)
            .ok_or(DriveError::Underflow)?;
        user_account.storage_used = user_account
            .storage_used
            .checked_sub(file.size)
            .ok_or(DriveError::Underflow)?;

        emit!(FileDeleted {
            file: file.key(),
            owner: file.owner,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn update_folder(
        ctx: Context<UpdateFolder>,
        name: Option<String>,
        new_parent_folder: Option<Pubkey>,
    ) -> Result<()> {
        let folder = &mut ctx.accounts.folder;

        if let Some(new_name) = name {
            require!(new_name.len() <= MAX_NAME_LENGTH, DriveError::NameTooLong);
            folder.name = new_name;
        }

        if let Some(new_parent) = new_parent_folder {
            require!(
                folder.key() != new_parent,
                DriveError::CannotMoveFolderIntoItself
            );
            folder.parent_folder = new_parent;
        }

        folder.updated_at = Clock::get()?.unix_timestamp;

        emit!(FolderUpdated {
            folder: folder.key(),
            name: folder.name.clone(),
            parent_folder: folder.parent_folder,
            timestamp: folder.updated_at,
        });

        Ok(())
    }

    pub fn delete_folder(ctx: Context<DeleteFolder>) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let folder = &ctx.accounts.folder;

        require!(
            folder.key() != user_account.root_folder,
            DriveError::CannotDeleteRootFolder
        );

        user_account.folder_count = user_account
            .folder_count
            .checked_sub(1)
            .ok_or(DriveError::Underflow)?;

        emit!(FolderDeleted {
            folder: folder.key(),
            owner: folder.owner,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn share_file(ctx: Context<ShareFile>, shared_with: Pubkey, permissions: u8) -> Result<()> {
        require!(
            permissions <= MAX_PERMISSIONS,
            DriveError::InvalidPermissions
        );

        let file = &mut ctx.accounts.file;
        let file_permission = &mut ctx.accounts.file_permission;

        file.is_shared = true;
        file_permission.file = file.key();
        file_permission.user = shared_with;
        file_permission.permissions = permissions;

        emit!(FileShared {
            file: file.key(),
            owner: file.owner,
            shared_with,
            permissions,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn share_folder(
        ctx: Context<ShareFolder>,
        shared_with: Pubkey,
        permissions: u8,
    ) -> Result<()> {
        require!(
            permissions <= MAX_PERMISSIONS,
            DriveError::InvalidPermissions
        );

        let folder = &mut ctx.accounts.folder;
        let folder_permission = &mut ctx.accounts.folder_permission;

        folder.is_shared = true;
        folder_permission.folder = folder.key();
        folder_permission.user = shared_with;
        folder_permission.permissions = permissions;

        emit!(FolderShared {
            folder: folder.key(),
            owner: folder.owner,
            shared_with,
            permissions,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn revoke_file_access(ctx: Context<RevokeFileAccess>) -> Result<()> {
        let file = &mut ctx.accounts.file;
        let file_permission = &ctx.accounts.file_permission;

        require!(file.is_shared, DriveError::FileNotShared);

        file.is_shared = false;

        emit!(FileAccessRevoked {
            file: file.key(),
            owner: file.owner,
            revoked_from: file_permission.user,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn revoke_folder_access(ctx: Context<RevokeFolderAccess>) -> Result<()> {
        let folder = &mut ctx.accounts.folder;
        let folder_permission = &ctx.accounts.folder_permission;

        require!(folder.is_shared, DriveError::FolderNotShared);

        folder.is_shared = false;

        emit!(FolderAccessRevoked {
            folder: folder.key(),
            owner: folder.owner,
            revoked_from: folder_permission.user,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + UserAccount::SPACE,
        seeds = [b"user_account", user.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,
    #[account(
        init,
        payer = user,
        space = 8 + Folder::SPACE,
        seeds = [b"root_folder", user.key().as_ref()],
        bump
    )]
    pub root_folder: Account<'info, Folder>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateFolder<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    #[account(
        init,
        payer = user,
        space = 8 + Folder::SPACE,
        seeds = [b"folder", user.key().as_ref(), &[user_account.folder_count as u8]],
        bump
    )]
    pub folder: Account<'info, Folder>,
    #[account(constraint = parent_folder.owner == user.key())]
    pub parent_folder: Account<'info, Folder>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UploadFile<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    #[account(
        init,
        payer = user,
        space = 8 + File::SPACE,
        seeds = [b"file", user.key().as_ref(), &[user_account.file_count as u8]],
        bump
    )]
    pub file: Account<'info, File>,
    #[account(constraint = folder.owner == user.key())]
    pub folder: Account<'info, Folder>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateFile<'info> {
    #[account(mut)]
    pub file: Account<'info, File>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteFile<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut, close = user)]
    pub file: Account<'info, File>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateFolder<'info> {
    #[account(mut)]
    pub folder: Account<'info, Folder>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteFolder<'info> {
    #[account(mut)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut, close = user)]
    pub folder: Account<'info, Folder>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct ShareFile<'info> {
    #[account(mut)]
    pub file: Account<'info, File>,
    #[account(
        init,
        payer = user,
        space = 8 + FilePermission::SPACE,
        seeds = [b"file-permission", file.key().as_ref(), shared_user.key().as_ref()],
        bump
    )]
    pub file_permission: Account<'info, FilePermission>,
    /// CHECK: This account is not written to or read
    pub shared_user: AccountInfo<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ShareFolder<'info> {
    #[account(mut)]
    pub folder: Account<'info, Folder>,
    #[account(
        init,
        payer = user,
        space = 8 + FolderPermission::SPACE,
        seeds = [b"folder-permission", folder.key().as_ref(), shared_user.key().as_ref()],
        bump
    )]
    pub folder_permission: Account<'info, FolderPermission>,
    /// CHECK: This account is not written to or read
    pub shared_user: AccountInfo<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RevokeFileAccess<'info> {
    #[account(mut)]
    pub file: Account<'info, File>,
    #[account(
        mut,
        close = user,
        constraint = file_permission.file == file.key(),
        seeds = [b"file-permission", file.key().as_ref(), file_permission.user.as_ref()],
        bump
    )]
    pub file_permission: Account<'info, FilePermission>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct RevokeFolderAccess<'info> {
    #[account(mut)]
    pub folder: Account<'info, Folder>,
    #[account(
        mut,
        close = user,
        constraint = folder_permission.folder == folder.key(),
        seeds = [b"folder-permission", folder.key().as_ref(), folder_permission.user.as_ref()],
        bump
    )]
    pub folder_permission: Account<'info, FolderPermission>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct UserAccount {
    pub owner: Pubkey,
    pub root_folder: Pubkey,
    pub storage_used: u64,
    pub file_count: u16,
    pub folder_count: u16,
}

impl UserAccount {
    pub const SPACE: usize = 32 + 32 + 8 + 2 + 2;
}

#[account]
pub struct File {
    pub owner: Pubkey,
    pub name: String,
    pub file_type: String,
    pub size: u64,
    pub ipfs_cid: String,
    pub folder: Pubkey,
    pub created_at: i64,
    pub updated_at: i64,
    pub is_shared: bool,
}

impl File {
    pub const SPACE: usize = 32 + 64 + 32 + 8 + 64 + 32 + 8 + 8 + 1;
}

#[account]
pub struct Folder {
    pub owner: Pubkey,
    pub name: String,
    pub parent_folder: Pubkey,
    pub created_at: i64,
    pub updated_at: i64,
    pub is_shared: bool,
}

impl Folder {
    pub const SPACE: usize = 32 + 64 + 32 + 8 + 8 + 1;
}

#[account]
pub struct FilePermission {
    pub file: Pubkey,
    pub user: Pubkey,
    pub permissions: u8,
}

impl FilePermission {
    pub const SPACE: usize = 32 + 32 + 1;
}

#[account]
pub struct FolderPermission {
    pub folder: Pubkey,
    pub user: Pubkey,
    pub permissions: u8,
}

impl FolderPermission {
    pub const SPACE: usize = 32 + 32 + 1;
}

#[error_code]
pub enum DriveError {
    #[msg("Name is too long")]
    NameTooLong,
    #[msg("Invalid file type")]
    InvalidFileType,
    #[msg("Invalid IPFS CID")]
    InvalidIpfsCid,
    #[msg("Storage limit exceeded")]
    StorageLimitExceeded,
    #[msg("Invalid permissions")]
    InvalidPermissions,
    #[msg("Arithmetic underflow")]
    Underflow,
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Storage overflow")]
    StorageOverflow,
    #[msg("Cannot delete root folder")]
    CannotDeleteRootFolder,
    #[msg("Cannot move root folder")]
    CannotMoveRootFolder,
    #[msg("Cannot move folder into itself")]
    CannotMoveFolderIntoItself,
    #[msg("File is not shared")]
    FileNotShared,
    #[msg("Folder is not shared")]
    FolderNotShared,
}

// Events
#[event]
pub struct UserInitialized {
    pub user: Pubkey,
    pub root_folder: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FolderCreated {
    pub folder: Pubkey,
    pub owner: Pubkey,
    pub name: String,
    pub parent_folder: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FileUploaded {
    pub file: Pubkey,
    pub owner: Pubkey,
    pub name: String,
    pub size: u64,
    pub folder: Pubkey,
    pub ipfs_cid: String,
    pub timestamp: i64,
}

#[event]
pub struct FileUpdated {
    pub file: Pubkey,
    pub name: String,
    pub folder: Pubkey,
    pub ipfs_cid: String,
    pub timestamp: i64,
}

#[event]
pub struct FileDeleted {
    pub file: Pubkey,
    pub owner: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FolderUpdated {
    pub folder: Pubkey,
    pub name: String,
    pub parent_folder: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FolderDeleted {
    pub folder: Pubkey,
    pub owner: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FileShared {
    pub file: Pubkey,
    pub owner: Pubkey,
    pub shared_with: Pubkey,
    pub permissions: u8,
    pub timestamp: i64,
}

#[event]
pub struct FolderShared {
    pub folder: Pubkey,
    pub owner: Pubkey,
    pub shared_with: Pubkey,
    pub permissions: u8,
    pub timestamp: i64,
}

#[event]
pub struct FileAccessRevoked {
    pub file: Pubkey,
    pub owner: Pubkey,
    pub revoked_from: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct FolderAccessRevoked {
    pub folder: Pubkey,
    pub owner: Pubkey,
    pub revoked_from: Pubkey,
    pub timestamp: i64,
}

// Constants
pub const MAX_STORAGE_PER_USER: u64 = 10_000_000_000; // 10 GB in bytes
pub const MAX_NAME_LENGTH: usize = 64;
pub const MAX_FILE_TYPE_LENGTH: usize = 32;
pub const MAX_IPFS_CID_LENGTH: usize = 64; // IPFS CIDs are typically 46 characters, but we'll allow some extra space
pub const MAX_PERMISSIONS: u8 = 2; //
