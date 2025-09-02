import { db } from "utils/db";
import { MenuModel } from "models/menu";

export async function POST(req: Request) {
  try {

    await db();

    const body = await req.json();

    const { name, href } = body;

    const data = await MenuModel.findOne({ href });
    console.log({ data })

    if (data) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Menu already on DB',
        }),
        { status: 409 }
      );
    }

    const menuObject = await MenuModel.create({ name, href });

    console.log(menuObject)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Success on menu entry creation',
        data: menuObject,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'There is an error querying the database',
        err,
      }),
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    await db();
    const menu = await MenuModel.find().select({ __v: 0 });

    return new Response(JSON.stringify({
      success: true,
      data: menu,
      message: "Success on menu retrieval"
    }))

  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'There is an error querying the database',
        err,
      }),
      { status: 500 }
    );
  }
}