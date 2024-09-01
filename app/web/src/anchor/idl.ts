export type Ledgerdrive = {
    "version": "0.1.0",
    "name": "ledgerdrive",
    "instructions": [
        {
            "name": "initializeUser",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rootFolder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createFolder",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "parentFolder",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                }
            ]
        },
        {
            "name": "uploadFile",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folder",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "fileType",
                    "type": "string"
                },
                {
                    "name": "size",
                    "type": "u64"
                },
                {
                    "name": "ipfsCid",
                    "type": "string"
                }
            ]
        },
        {
            "name": "updateFile",
            "accounts": [
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": {
                        "option": "string"
                    }
                },
                {
                    "name": "ipfsCid",
                    "type": {
                        "option": "string"
                    }
                },
                {
                    "name": "newFolder",
                    "type": {
                        "option": "publicKey"
                    }
                }
            ]
        },
        {
            "name": "deleteFile",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        },
        {
            "name": "updateFolder",
            "accounts": [
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": {
                        "option": "string"
                    }
                },
                {
                    "name": "newParentFolder",
                    "type": {
                        "option": "publicKey"
                    }
                }
            ]
        },
        {
            "name": "deleteFolder",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        },
        {
            "name": "shareFile",
            "accounts": [
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "filePermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sharedUser",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "sharedWith",
                    "type": "publicKey"
                },
                {
                    "name": "permissions",
                    "type": "u8"
                }
            ]
        },
        {
            "name": "shareFolder",
            "accounts": [
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folderPermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sharedUser",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "sharedWith",
                    "type": "publicKey"
                },
                {
                    "name": "permissions",
                    "type": "u8"
                }
            ]
        },
        {
            "name": "revokeFileAccess",
            "accounts": [
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "filePermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        },
        {
            "name": "revokeFolderAccess",
            "accounts": [
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folderPermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "userAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "rootFolder",
                        "type": "publicKey"
                    },
                    {
                        "name": "storageUsed",
                        "type": "u64"
                    },
                    {
                        "name": "fileCount",
                        "type": "u16"
                    },
                    {
                        "name": "folderCount",
                        "type": "u16"
                    }
                ]
            }
        },
        {
            "name": "file",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "fileType",
                        "type": "string"
                    },
                    {
                        "name": "size",
                        "type": "u64"
                    },
                    {
                        "name": "ipfsCid",
                        "type": "string"
                    },
                    {
                        "name": "folder",
                        "type": "publicKey"
                    },
                    {
                        "name": "createdAt",
                        "type": "i64"
                    },
                    {
                        "name": "updatedAt",
                        "type": "i64"
                    },
                    {
                        "name": "isShared",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "folder",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "parentFolder",
                        "type": "publicKey"
                    },
                    {
                        "name": "createdAt",
                        "type": "i64"
                    },
                    {
                        "name": "updatedAt",
                        "type": "i64"
                    },
                    {
                        "name": "isShared",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "filePermission",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "file",
                        "type": "publicKey"
                    },
                    {
                        "name": "user",
                        "type": "publicKey"
                    },
                    {
                        "name": "permissions",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "folderPermission",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "folder",
                        "type": "publicKey"
                    },
                    {
                        "name": "user",
                        "type": "publicKey"
                    },
                    {
                        "name": "permissions",
                        "type": "u8"
                    }
                ]
            }
        }
    ],
    "events": [
        {
            "name": "UserInitialized",
            "fields": [
                {
                    "name": "user",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "rootFolder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderCreated",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "parentFolder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileUploaded",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "size",
                    "type": "u64",
                    "index": false
                },
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "ipfsCid",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileUpdated",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "ipfsCid",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileDeleted",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderUpdated",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "parentFolder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderDeleted",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileShared",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "sharedWith",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "permissions",
                    "type": "u8",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderShared",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "sharedWith",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "permissions",
                    "type": "u8",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileAccessRevoked",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "revokedFrom",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderAccessRevoked",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "revokedFrom",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "NameTooLong",
            "msg": "Name is too long"
        },
        {
            "code": 6001,
            "name": "InvalidFileType",
            "msg": "Invalid file type"
        },
        {
            "code": 6002,
            "name": "InvalidIpfsCid",
            "msg": "Invalid IPFS CID"
        },
        {
            "code": 6003,
            "name": "StorageLimitExceeded",
            "msg": "Storage limit exceeded"
        },
        {
            "code": 6004,
            "name": "InvalidPermissions",
            "msg": "Invalid permissions"
        },
        {
            "code": 6005,
            "name": "Underflow",
            "msg": "Arithmetic underflow"
        },
        {
            "code": 6006,
            "name": "Overflow",
            "msg": "Arithmetic overflow"
        },
        {
            "code": 6007,
            "name": "StorageOverflow",
            "msg": "Storage overflow"
        },
        {
            "code": 6008,
            "name": "CannotDeleteRootFolder",
            "msg": "Cannot delete root folder"
        },
        {
            "code": 6009,
            "name": "CannotMoveRootFolder",
            "msg": "Cannot move root folder"
        },
        {
            "code": 6010,
            "name": "CannotMoveFolderIntoItself",
            "msg": "Cannot move folder into itself"
        },
        {
            "code": 6011,
            "name": "FileNotShared",
            "msg": "File is not shared"
        },
        {
            "code": 6012,
            "name": "FolderNotShared",
            "msg": "Folder is not shared"
        }
    ]
};

export const IDL: Ledgerdrive = {
    "version": "0.1.0",
    "name": "ledgerdrive",
    "instructions": [
        {
            "name": "initializeUser",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rootFolder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createFolder",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "parentFolder",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                }
            ]
        },
        {
            "name": "uploadFile",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folder",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "fileType",
                    "type": "string"
                },
                {
                    "name": "size",
                    "type": "u64"
                },
                {
                    "name": "ipfsCid",
                    "type": "string"
                }
            ]
        },
        {
            "name": "updateFile",
            "accounts": [
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": {
                        "option": "string"
                    }
                },
                {
                    "name": "ipfsCid",
                    "type": {
                        "option": "string"
                    }
                },
                {
                    "name": "newFolder",
                    "type": {
                        "option": "publicKey"
                    }
                }
            ]
        },
        {
            "name": "deleteFile",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        },
        {
            "name": "updateFolder",
            "accounts": [
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": {
                        "option": "string"
                    }
                },
                {
                    "name": "newParentFolder",
                    "type": {
                        "option": "publicKey"
                    }
                }
            ]
        },
        {
            "name": "deleteFolder",
            "accounts": [
                {
                    "name": "userAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        },
        {
            "name": "shareFile",
            "accounts": [
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "filePermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sharedUser",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "sharedWith",
                    "type": "publicKey"
                },
                {
                    "name": "permissions",
                    "type": "u8"
                }
            ]
        },
        {
            "name": "shareFolder",
            "accounts": [
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folderPermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sharedUser",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "sharedWith",
                    "type": "publicKey"
                },
                {
                    "name": "permissions",
                    "type": "u8"
                }
            ]
        },
        {
            "name": "revokeFileAccess",
            "accounts": [
                {
                    "name": "file",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "filePermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        },
        {
            "name": "revokeFolderAccess",
            "accounts": [
                {
                    "name": "folder",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "folderPermission",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "userAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "rootFolder",
                        "type": "publicKey"
                    },
                    {
                        "name": "storageUsed",
                        "type": "u64"
                    },
                    {
                        "name": "fileCount",
                        "type": "u16"
                    },
                    {
                        "name": "folderCount",
                        "type": "u16"
                    }
                ]
            }
        },
        {
            "name": "file",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "fileType",
                        "type": "string"
                    },
                    {
                        "name": "size",
                        "type": "u64"
                    },
                    {
                        "name": "ipfsCid",
                        "type": "string"
                    },
                    {
                        "name": "folder",
                        "type": "publicKey"
                    },
                    {
                        "name": "createdAt",
                        "type": "i64"
                    },
                    {
                        "name": "updatedAt",
                        "type": "i64"
                    },
                    {
                        "name": "isShared",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "folder",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "parentFolder",
                        "type": "publicKey"
                    },
                    {
                        "name": "createdAt",
                        "type": "i64"
                    },
                    {
                        "name": "updatedAt",
                        "type": "i64"
                    },
                    {
                        "name": "isShared",
                        "type": "bool"
                    }
                ]
            }
        },
        {
            "name": "filePermission",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "file",
                        "type": "publicKey"
                    },
                    {
                        "name": "user",
                        "type": "publicKey"
                    },
                    {
                        "name": "permissions",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "folderPermission",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "folder",
                        "type": "publicKey"
                    },
                    {
                        "name": "user",
                        "type": "publicKey"
                    },
                    {
                        "name": "permissions",
                        "type": "u8"
                    }
                ]
            }
        }
    ],
    "events": [
        {
            "name": "UserInitialized",
            "fields": [
                {
                    "name": "user",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "rootFolder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderCreated",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "parentFolder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileUploaded",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "size",
                    "type": "u64",
                    "index": false
                },
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "ipfsCid",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileUpdated",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "ipfsCid",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileDeleted",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderUpdated",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "name",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "parentFolder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderDeleted",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileShared",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "sharedWith",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "permissions",
                    "type": "u8",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderShared",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "sharedWith",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "permissions",
                    "type": "u8",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FileAccessRevoked",
            "fields": [
                {
                    "name": "file",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "revokedFrom",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        },
        {
            "name": "FolderAccessRevoked",
            "fields": [
                {
                    "name": "folder",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "owner",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "revokedFrom",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                }
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "NameTooLong",
            "msg": "Name is too long"
        },
        {
            "code": 6001,
            "name": "InvalidFileType",
            "msg": "Invalid file type"
        },
        {
            "code": 6002,
            "name": "InvalidIpfsCid",
            "msg": "Invalid IPFS CID"
        },
        {
            "code": 6003,
            "name": "StorageLimitExceeded",
            "msg": "Storage limit exceeded"
        },
        {
            "code": 6004,
            "name": "InvalidPermissions",
            "msg": "Invalid permissions"
        },
        {
            "code": 6005,
            "name": "Underflow",
            "msg": "Arithmetic underflow"
        },
        {
            "code": 6006,
            "name": "Overflow",
            "msg": "Arithmetic overflow"
        },
        {
            "code": 6007,
            "name": "StorageOverflow",
            "msg": "Storage overflow"
        },
        {
            "code": 6008,
            "name": "CannotDeleteRootFolder",
            "msg": "Cannot delete root folder"
        },
        {
            "code": 6009,
            "name": "CannotMoveRootFolder",
            "msg": "Cannot move root folder"
        },
        {
            "code": 6010,
            "name": "CannotMoveFolderIntoItself",
            "msg": "Cannot move folder into itself"
        },
        {
            "code": 6011,
            "name": "FileNotShared",
            "msg": "File is not shared"
        },
        {
            "code": 6012,
            "name": "FolderNotShared",
            "msg": "Folder is not shared"
        }
    ]
};
