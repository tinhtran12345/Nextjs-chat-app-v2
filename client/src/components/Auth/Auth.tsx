import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "inspector";
import { signIn } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
import logoGoogle from "../../../public/images/googlelogo.png";

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
    session,
    reloadSession,
}) => {
    const [username, setUsername] = React.useState("");
    const handleSubmit = async () => {
        try {
            // Create username mutation to send our username to API
        } catch (error) {
            console.log("Handle submit error: ", error);
        }
    };
    return (
        <Center height={"100vh"} border={"1px solid red"}>
            <Stack align={"center"} spacing={8}>
                {session ? (
                    <>
                        <Text fontSize={"3xl"}>Create a username</Text>
                        <Input
                            placeholder="Enter user name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button width={"100%"} onClick={handleSubmit}>
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Text fontSize={"3xl"}> My Messenger</Text>
                        <Button
                            padding={"30px 40px"}
                            leftIcon={
                                <Image className="logo" src={logoGoogle} />
                            }
                            onClick={() => signIn()}
                        >
                            Continue with Google
                        </Button>
                    </>
                )}
            </Stack>
        </Center>
    );
};

export default Auth;
