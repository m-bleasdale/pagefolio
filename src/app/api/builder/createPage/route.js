import { createClient } from '@/utils/supabase/server';
import { auth0 } from '@/lib/auth0';

export async function POST(req) {

    //Get authenticated user from Auth0 session
    const session = await auth0.getSession();
    if (!session || !session.user) {
        return new Response(JSON.stringify({ message: "Unauthorised" }), {
            status: 401,
        });
    }
    const auth0Sub = session.user.sub;

    const supabase = await createClient(); //may want RLS check too -- important (access token is in session.tokenSet.accessToken);

    try {
        const { slugInput, page_type } = await req.json();

        const slug = slugInput.toLowerCase();

        const default_title = slug;
        const default_meta = {"description": `${slug}'s site, powered by PageFolio.`}

        const { data, error } = await supabase
            .from('pages')
            .insert([{ slug, page_type, user_id: auth0Sub, title: default_title, meta: default_meta }]);

        console.log(error);

        if (error) {
            return new Response(JSON.stringify({ message: error.message }), {
                status: 400,
            });
        }
        
        return new Response(JSON.stringify({ message: 'Page created successfully!', data }), {
            status: 201,
        });

    } catch (err) {
        console.error('Error inserting data:', err);
        return new Response(JSON.stringify({ message: 'Error inserting data' }), {
            status: 500,
        });
    }
}