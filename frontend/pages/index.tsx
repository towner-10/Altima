import type { NextPage } from 'next'
import Head from 'next/head'
import { PointSelectorMap } from '../components/map'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LoginButton, LoginIcons } from "../components/loginButtons";
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0'

interface Location {
  lng: number,
  lat: number
}

export interface Data {
  message: {
    tempScore: number,
    humidityScore: number,
    windScore: number,
    solar: number,
    turbine: number,
    solarKWH: number,
    turbineKWH: number
  },
  status: number
}

const Home: NextPage = () => {

  const [openNoLocation, setOpenNoLocation] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [data, setData] = useState<Data | undefined>(undefined);
  const { user } = useUser();

  const markerUpdate = (e: Location) => {
    setLocation(e);
  }

  return (
    <>
      <div className="bg-babyPowder h-screen">
        <Head>
          <title>ALTIMA</title>
          <meta name="description" content="Find the best alternative to alternative energy!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='bg-artichoke-400 grid grid-cols-3 px-6'>
          <div className='col-span-1'></div>
          <h1 className="py-2 font-oswald text-6xl text-babyPowder text-center col-span-1">ALTIMA</h1>
          <div className="col-span-1 flex flex-col justify-center items-end sm:hidden">
            <LoginIcons home={true} />
          </div>
          <div className='col-span-1 hidden flex-col justify-center items-end sm:flex'>
            <LoginButton home={true} />
          </div>
        </div>

        <div className='pt-4 px-6'>
          <PointSelectorMap markerEvent={(e: any) => {
            markerUpdate({
              lng: e.lng,
              lat: e.lat
            });
          }} style={{ width: '100%', height: '75vh' }} />

          <div className='py-6 flex flex-row justify-center'>
            <button className="block w-full md:w-60 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-600 hover:bg-artichoke-500 focus:ring-4 focus:outline-none focus:ring-charlestonGreen font-medium rounded-full px-5 py-2.5 text-center h-12" type="button" onClick={(e) => {
              if (location === undefined) {
                setOpenNoLocation(true);
              }
              else {
                setOpenResponse(true);
                if (process.env.NEXT_PUBLIC_API_URL === undefined) return;
                axios.get(process.env.NEXT_PUBLIC_API_URL + `/query?lng=${location.lng}&lat=${location.lat}`).then(res => {
                  setData(res.data);
                  console.log(res.data);
                });
              }
            }}>
              Confirm
            </button>
          </div>
        </div>
      </div>

      <Transition.Root show={openNoLocation} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenNoLocation}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          No Location Selected
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Select a location on the map using the textbox, and then drag the marker for a more precise location.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-paleSpringBud bg-babyPowder px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-artichoke-400 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenNoLocation(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openResponse} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setOpenResponse(false);
          setData(undefined);
        }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="text-center sm:mt-0 sm:ml-4">
                      <div className='flex flex-row justify-between items-center'>
                        <Dialog.Title as="h2" className="text-sm italic text-left break-words text-charlestonGreen">
                          The best alternative energy source here is...
                        </Dialog.Title>
                        <button className='w-8 h-8 ml-6' type='button' onClick={() => {
                          setOpenResponse(false);
                          setData(undefined);
                        }}>
                          <div className='w-8 h-8 rounded-full bg-paleSpringBud text-artichoke-500 flex items-center justify-center hover:transition-all hover:border-2 hover:border-artichoke-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        </button>
                      </div>

                      {data !== undefined &&
                        <div className='flex flex-col justify-center items-center'>
                          <h1 className='font-oswald text-3xl'>{data.message.solarKWH <= data.message.turbineKWH ? 'SOLAR' : 'TURBINE'}</h1>
                          <h2 className='italic text-sm'>{data.message.solarKWH <= data.message.turbineKWH ? `$${data.message.solarKWH.toFixed(2)} / kWh` : `$${data.message.turbineKWH.toFixed(2)} / kWh`}</h2>
                        </div>
                      }

                      {data === undefined &&
                        <div className='flex flex-col justify-center items-center'>
                          <h1 className='mb-2 h-8 w-36 rounded-full bg-artichoke-300 animate-pulse'></h1>
                          <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                        </div>
                      }

                      <div className="mt-2">
                        <div className="flex flex-col px-6 text-charlestonGreen text-sm">
                          <div className='flex flex-row justify-between'>
                            <h2>Humidity Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.humidityScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                          <div className='flex flex-row justify-between'>
                            <h2>Temperature Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.tempScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                          <div className='flex flex-row justify-between'>
                            <h2>Wind Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.windScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                        </div>
                      </div>
                      <div className='py-6 px-12 flex flex-row justify-center'>
                        <button className="block w-full md:w-32 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-400 hover:bg-artichoke-300 focus:ring-4 focus:outline-none focus:ring-artichoke-500 font-medium rounded-full text-sm px-5 py-2.5 text-center h-12" type="button" onClick={(e) => {
                          setOpenResponse(false);
                          setOpenCompare(true);
                        }}>
                          Compare
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openCompare} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setOpenCompare(false);
          setData(undefined);
        }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="text-center sm:mt-0 sm:ml-4">
                      <div className='text-right'>
                        <button className='w-8 h-8 ml-6' type='button' onClick={() => {
                          setOpenCompare(false);
                          setData(undefined);
                        }}>
                          <div className='w-8 h-8 rounded-full bg-paleSpringBud text-artichoke-500 flex items-center justify-center hover:transition-all hover:border-2 hover:border-artichoke-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        </button>
                      </div>

                      {data !== undefined &&
                        <div className='flex flex-row justify-evenly'>
                          <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-oswald text-3xl'>SOLAR</h1>
                            <h2 className='italic text-sm'>${data.message.solarKWH.toFixed(2)} / kWh</h2>
                          </div>
                          <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-oswald text-3xl'>TURBINE</h1>
                            <h2 className='italic text-sm'>${data.message.turbineKWH.toFixed(2)} / kWh</h2>
                          </div>
                        </div>
                      }

                      {data === undefined &&
                        <div className='flex flex-row justify-evenly'>
                          <div className='flex flex-col justify-center items-center'>
                            <h1 className='mb-2 h-8 w-36 rounded-full bg-artichoke-300 animate-pulse'></h1>
                            <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                          </div>
                          <div className='flex flex-col justify-center items-center'>
                            <h1 className='mb-2 h-8 w-36 rounded-full bg-artichoke-300 animate-pulse'></h1>
                            <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                          </div>
                        </div>
                      }

                      {user && <div className="mt-2">
                        <div className="flex flex-col px-6 text-charlestonGreen text-sm">
                          <div className='flex flex-row justify-between'>
                            <h2>Humidity Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.humidityScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                          <div className='flex flex-row justify-between'>
                            <h2>Temperature Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.tempScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                          <div className='flex flex-row justify-between'>
                            <h2>Wind Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.windScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                        </div>
                        <div className='py-6 px-12 flex flex-row justify-center'>
                          <button className="block w-full md:w-32 hover:transition-all focus:transition-all text-babyPowder bg-artichoke-400 hover:bg-artichoke-300 focus:ring-4 focus:outline-none focus:ring-artichoke-500 font-medium rounded-full text-sm px-5 py-2.5 text-center h-12" type="button" onClick={(e) => {
                            if (process.env.NEXT_PUBLIC_API_URL === undefined || user?.email === undefined || location === undefined) return;

                            axios.post(process.env.NEXT_PUBLIC_API_URL + `/save?user=${user?.email}&lng=${location.lng}&lat=${location.lat}`).then(res => {
                              setOpenCompare(false);
                              setData(undefined);
                            });
                          }}>
                            Save
                          </button>
                        </div>
                      </div>}
                      {user === undefined && <div className="mt-2 pb-6">
                        <div className="flex flex-col px-6 text-charlestonGreen text-sm">
                          <div className='flex flex-row justify-between'>
                            <h2>Humidity Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.humidityScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                          <div className='flex flex-row justify-between'>
                            <h2>Temperature Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.tempScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                          <div className='flex flex-row justify-between'>
                            <h2>Wind Rating</h2>
                            {data !== undefined &&
                              <h2>{(data.message.windScore * 10).toFixed(2)} / 10</h2>
                            }
                            {data === undefined &&
                              <h2 className='h-3 w-24 rounded-full bg-artichoke-300 animate-pulse'></h2>
                            }
                          </div>
                        </div>
                      </div>}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Home
