import React, { useEffect, useState } from 'react'
import ListingCard from '../components/ListingCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BsArrowRight, BsArrowLeft, } from "react-icons/bs";
import SkletonLoading from './SkletonLoading';
import { useNavigate } from 'react-router-dom';





const OfferedListing = () => {
    const [loading, setLoading] = useState(true)
    const [offerListings, setOfferListings] = useState([])
    const navigate = useNavigate()

    //===Load Data ===//
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/posts?type=all&offer=true`)
                const json = await res.json()
                if (json.success === false) {
                    setLoading(false)
                }
                else {
                    setOfferListings(json)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()
    }, [])


    //====SLider Functions=====//
    function SamplePrevArrow({ onClick }) {
        return (
            <div
                className='absolute bottom-0 left-5 z-10   p-2 px-5 sm:px-8 sm:p-4 sm:py-3 rounded-s-md bg-brand-blue flex items-center justify-center border-2 border-transparent cursor-pointer shadow-lg hover:bg-white/90 
                hover:border-2 hover:border-brand-blue  duration-300 group sm:right-32  sm:left-auto'
                onClick={onClick}
            >
                <BsArrowLeft className='text-white text-xl sm:text-xl group-hover:text-brand-blue ' />
            </div>
        )
    }
    function SampleNextArrow({ onClick }) {
        return (
            <div
                className='absolute bottom-0 right-5 sm:right-2 px-5 sm:px-8 sm:py-3 z-10  p-2 sm:p-4 rounded-e-md bg-brand-blue flex items-center justify-center border-2 border-transparent cursor-pointer shadow-lg hover:bg-white/90 duration-300 group hover:border-brand-blue'
                onClick={onClick}
            >
                <BsArrowRight className='text-white text-xl sm:text-xl group-hover:text-brand-blue ' />
            </div>
        )
    }

    const settings = {
        dots: false,
        infinite: true,
        lazyLoad: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };



    return (
        < section >
            <div
                className="mx-auto max-w-screen-xl  space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8"
            >
                <section className="py-16 bg-gray-50">
                    <div className="content mx-auto max-w-screen-xl px-4 text-center">
                        <h2 className="text-3xl font-bold sm:text-5xl font-heading text-black text-center">
                            Enjoy Our <span className="bg-black text-white px-1 pb-1">Exciting Features</span>
                        </h2>

                        <p className="font-content font-medium text-sm sm:text-lg mt-4 max-w-3xl mx-auto">
                            At TaskLink, we provide services that make your experience easier. From negotiating prices to listing top workers, we are here to assist you.
                        </p>

                        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Card 1: Negotiate Price */}
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                        <path d="M8 3.293l4 4V13h2V7.707a1 1 0 0 0-.293-.707l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0-.293.707V13h2V7.707l4-4z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-bold text-black">Negotiate Price</h3>
                                <p className="mt-2 text-gray-600">Easily negotiate prices with workers, ensuring you get the best deal for your task.</p>
                            </div>

                            {/* Card 2: Listing Top Workers */}
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 2.69 0 6c0 1.28.34 2.48.92 3.52l-1.1 3.66a1 1 0 0 0 .61 1.26c.07.02.14.02.21.02.52 0 .96-.38 1.08-.88l.84-2.81c.16.04.34.06.52.06 4.42 0 8-2.69 8-6 0-3.31-3.58-6-8-6zm-.56 8H7.56c-.4 0-.72-.34-.72-.75 0-.42.32-.75.72-.75h.88c.4 0 .72.34.72.75 0 .42-.32.75-.72.75z" />
                                    </svg>
                                    </div>
                                    <h3 className="mt-4 text-xl font-bold text-black">Listing Top Workers</h3>
                                    <p className="mt-2 text-gray-600">Browse and connect with top-rated professionals, ensuring you hire the best for your tasks.</p>
                                </div>

                                {/* Card 3: Real Time Chat */}
                                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                                    <div className="text-blue-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.742a6.5 6.5 0 1 0-1.414 1.414 5.972 5.972 0 0 0 1.414-1.414zM12 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-4 text-xl font-bold text-black">Real Time Chat</h3>
                                    <p className="mt-2 text-gray-600">Chat with workers in real-time to discuss details, negotiate, and finalize tasks quickly.</p>
                                </div>
                            </div>
                        </div>
                    
                </section>


                <div className="post_container !mt-4">
                    {
                        loading ?
                            <SkletonLoading />
                            :
                            <div className="slider_container">
                                <Slider {...settings} className='z-10 relative gap-3'>
                                    {
                                        offerListings && offerListings.map(listing => <ListingCard key={listing._id} listing={listing} />)
                                    }
                                </Slider>
                            </div>
                    }
                </div>

                <div className="btn_container flex items-center justify-center">
                    <button
                        className="group relative inline-flex items-center overflow-hidden rounded bg-black px-8 py-3 text-white "
                        onClick={() => navigate('/search')}
                    >
                        <span className="absolute -end-full transition-all group-hover:end-4">
                            <svg
                                className="h-5 w-5 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </span>

                        <span className="text-sm font-medium transition-all  group-hover:me-4">
                            Explore More
                        </span>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default OfferedListing