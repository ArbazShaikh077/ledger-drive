import { useCreateAndSetUserAccount } from "@/store/account_provider";
import { Button } from "./ui/button";
import { Vortex } from "./Vortex";

function InitializeAccount() {
  const createAndSetUserAccount = useCreateAndSetUserAccount();

  const handleCreateAccount = async () => {
    await createAndSetUserAccount();
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <Vortex
        backgroundColor="bg-background"
        rangeY={800}
        particleCount={50}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Initialize Account
        </h1>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          <span className="font-extrabold">Let’s get started!</span> Click the
          button below to begin initializing your account with Ledger Drive.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              height: "35px",
              fontSize: "15px",
              fontWeight: "500",
              borderRadius: "5px",
            }}
            onClick={handleCreateAccount}
          >
            Initialize Account
          </Button>
        </div>
      </Vortex>
    </div>
  );
}

export default InitializeAccount;
