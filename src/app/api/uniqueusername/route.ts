import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/user.model';
import { z } from 'zod';
import { usernameValidation } from '@/schemas/signUpSchema';

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
    // if(request.method !== 'GET') {
    //     return Response.json({
    //             success: false,
    //             message: "Method Not Allowed"
    //         },
    //         { status: 405 }
    //     )
    // } Due to new versions of nextjs

    await dbConnect()

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username'),
        }
        // validate with zod 
        const result = UsernameQuerySchema.safeParse(queryParam);
        // console.log(result);
        // { success: true, data: { username: 'nadarnoor1234' } }
        // { success: true, data: { username: 'nadarnoor1234' } }

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                    success: false,
                    message: usernameErrors?.length>0?usernameErrors.join(','): 'Invalid query parameter'
                },
                { status: 400 }
            )
        } 

        const { username } = result.data

        const user = await UserModel.findOne({ username, isVerified: true })
        if(user){
            return Response.json(
                {
                    success: false,
                    message: "username is already taken"
                },
                { status: 400 }
            )
        } else {
            return Response.json(
                {
                    success: true,
                    message: "username is avaliable"
                },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error('Error while checking username:', error);
        return Response.json(
          {
            success: false,
            message: 'Error checking username',
          },
          { status: 500 }
        );
    }
}