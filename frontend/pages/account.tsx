import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { NextPage } from "next"
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginButton, LoginIcons } from "../components/loginButtons";

const Account: NextPage = () => {

    const { user } = useUser();
    const [data, setData] = useState<any | undefined>(undefined);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_API_URL !== undefined && user?.email !== undefined) {
            axios.get(process.env.NEXT_PUBLIC_API_URL + `/get/requests?user=${user?.email}`).then(res => {
                setData(res.data);
                console.log(res.data);
            });
        }
    }, [user]);

    if (data === undefined) {
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

                <div className="pt-28 flex flex-col items-center justify-center">
                    <div className="spinner-border animate-spin w-12 h-12 border-4 rounded-full text-artichoke-400" role="status"></div>
                </div>
            </div>
        );
    }

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

            <h1 className="text-center text-3xl pt-12 underline">Request History</h1>

            <div className=" flex flex-col items-center justify-center bg-babyPowder">
                {data.message.map((item: any, index: any) => (
                    <div className="px-6 mt-6 w-96 bg-artichoke-300 rounded-full flex flex-row justify-between items-center" id={index}>
                        <div className="py-2 text-babyPowder">{item[1]}</div>
                        <Link href={`/request/check?lng=${item[3]}&lat=${item[2]}`}>
                            <button className="col-span-1 block w-full md:w-40 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5 text-center h-12" type="button">
                                Check
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Account