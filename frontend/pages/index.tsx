import type { NextPage } from 'next'
import Head from 'next/head'
import { PointSelectorMap } from '../components/map'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Location {
  lng: number,
  lat: number
}

const Home: NextPage = () => {

  const [openNoLocation, setOpenNoLocation] = useState(false);
  const cancelButtonRef = useRef(null);

  const [location, setLocation] = useState<Location | undefined>(undefined);

  const markerUpdate = (e: Location) => {
    setLocation(e);
  }

  return (
    <>
      <div className="bg-babyPowder p-6 h-screen">
        <Head>
          <title>Altima</title>
          <meta name="description" content="Find the best alternative to alternative energy!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="font-oswald text-6xl text-charlestonGreen pb-2 text-center md:text-left">ALTIMA</h1>

        <PointSelectorMap markerEvent={(e: any) => {
          markerUpdate({
            lng: e.lng,
            lat: e.lat
          });
        }} style={{ width: '100%', height: '75vh' }} />

        <div className='py-6 flex flex-row justify-center'>
          <button className="block w-full md:w-60 text-babyPowder bg-artichoke-400 hover:bg-artichoke-300 focus:ring-4 focus:outline-none focus:ring-artichoke-500 font-medium rounded-full text-sm px-5 py-2.5 text-center h-12" type="button" onClick={(e) => {
            if (location === undefined) setOpenNoLocation(true);
          }}>
            Confirm
          </button>
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
    </>
  )
}

export default Home
