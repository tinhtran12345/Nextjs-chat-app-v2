import { CreateUsernameResponse, GraphQLContext } from "../../utils/types";

const resolvers = {
    Query: {
        searchUsers() {},
    },
    Mutation: {
        createUsername: async function createUsername(
            _: any,
            args: { username: string },
            context: GraphQLContext
        ) {
            const { session, prisma } = context;
            if (!session?.user) {
                return {
                    error: "Not authorized",
                };
            }
            const { id: userId } = session.user;
            const { username } = args;
            try {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        username,
                    },
                });
                if (existingUser) {
                    return {
                        error: "User already taken. Try another ",
                    };
                }
                // update user
                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        username,
                    },
                });
                return { success: true };

                // Check username is not taken
                // update user
            } catch (error: any) {
                console.log("create username error: ", error);
                return { error: error?.message };
            }
        },
    },
};

export default resolvers;
