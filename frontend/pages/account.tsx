import { NextPage } from "next"
import Head from "next/head";
import { LoginButton, LoginIcons } from "../components/loginButtons";

const Account: NextPage = () => {
    return (
        <div className="bg-babyPowder h-screen">
            <Head>
                <title>ALTIMA - Account</title>
                <meta name="description" content="Find the best alternative to alternative energy!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='bg-artichoke-400 grid grid-cols-3 px-6'>
                <div className='col-span-1'></div>
                <h1 className="py-2 font-oswald text-6xl text-babyPowder text-center col-span-1">ALTIMA</h1>
                <div className="col-span-1 flex flex-col justify-center items-end sm:hidden">
                    <LoginIcons home={false} />
                </div>
                <div className='col-span-1 hidden flex-col justify-center items-end sm:flex'>
                    <LoginButton home={false} />
                </div>
            </div>

            <div className="h-full flex flex-col items-center justify-center">
                <div className='sm:w-96 sm:h-96 max-w-3xl p-6 bg-paleSpringBud rounded-lg'>

                </div>
            </div>
        </div>
    );
}

export default Account