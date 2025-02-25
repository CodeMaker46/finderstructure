// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function CreateListing() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//     name: "",
//     description: "",
//     address: "",
//     type: "rent",
//     bedrooms: 1,
//     bathrooms: 1,
//     regularPrice: 50,
//     discountPrice: 0,
//     offer: false,
//     parking: false,
//     furnished: false,
//   });
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   console.log(formData);

//   /* Cloudinary Config */
//   const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwtbjre3q/upload";
//   const UPLOAD_PRESET = "task_link";

//   /* Handle Image Submit */
//   const handleImageSubmit = async () => {
//     if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
//       setUploading(true);
//       setImageUploadError(false);

//       try {
//         const promises = Array.from(files).map((file) => storeImage(file));
//         const urls = await Promise.all(promises);
//         setFormData({
//           ...formData,
//           imageUrls: formData.imageUrls.concat(urls),
//         });
//         setImageUploadError(false);
//       } catch (err) {
//         setImageUploadError("Image upload failed (2 mb max per image)");
//       } finally {
//         setUploading(false);
//       }
//     } else {
//       setImageUploadError("You can only upload 6 images per listing");
//     }
//   };

//   /* Store Image in Cloudinary */
//   const storeImage = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     const response = await fetch(CLOUDINARY_URL, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Image upload failed");
//     }

//     const data = await response.json();
//     return data.secure_url; // Cloudinary returns the image URL
//   };

//   /* Handle Remove Image */
//   const handleRemoveImage = (index) => {
//     setFormData({
//       ...formData,
//       imageUrls: formData.imageUrls.filter((_, i) => i !== index),
//     });
//   };

//   /* Handle Form Changes */
//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;

//     if (id === "sale" || id === "rent") {
//       setFormData({ ...formData, type: id });
//     } else if (["parking", "furnished", "offer"].includes(id)) {
//       setFormData({ ...formData, [id]: checked });
//     } else {
//       setFormData({ ...formData, [id]: type === "number" ? +value : value });
//     }
//   };

//   /* Handle Submit */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formData.imageUrls.length < 1) {
//         return setError("You must upload at least one image");
//       }
//       if (+formData.regularPrice < +formData.discountPrice) {
//         return setError("Discount price must be lower than regular price");
//       }

//       setLoading(true);
//       setError(false);

//       const res = await fetch("/api/user/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           userRef: currentUser._id,
//         }),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (!data.success) {
//         setError(data.message);
//       } else {
//         navigate(`/listing/${data._id}`);
//       }
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="p-3 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
//         {/* LEFT SIDE */}
//         <div className="flex flex-col gap-4 flex-1">
//           <input
//             type="text"
//             placeholder="Name"
//             className="border p-3 rounded-lg"
//             id="name"
//             maxLength="62"
//             minLength="10"
//             required
//             onChange={handleChange}
//             value={formData.name}
//           />
//           <textarea
//             placeholder="Description"
//             className="border p-3 rounded-lg"
//             id="description"
//             required
//             onChange={handleChange}
//             value={formData.description}
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             className="border p-3 rounded-lg"
//             id="address"
//             required
//             onChange={handleChange}
//             value={formData.address}
//           />
//           {/* Other Inputs */}
//         </div>
//         {/* RIGHT SIDE */}
//         <div className="flex flex-col flex-1 gap-4">
//           <p className="font-semibold">Images: (max 6)</p>
//           <div className="flex gap-4">
//             <input
//               onChange={(e) => setFiles(e.target.files)}
//               className="p-3 border border-gray-300 rounded w-full"
//               type="file"
//               accept="image/*"
//               multiple
//             />
//             <button
//               type="button"
//               disabled={uploading}
//               onClick={handleImageSubmit}
//               className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
//             >
//               {uploading ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//           <p className="text-red-700 text-sm">{imageUploadError}</p>
//           {formData.imageUrls.map((url, index) => (
//             <div key={url} className="flex justify-between p-3 border items-center">
//               <img
//                 src={url}
//                 alt="listing image"
//                 className="w-20 h-20 object-contain rounded-lg"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveImage(index)}
//                 className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             disabled={loading || uploading}
//             className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//           >
//             {loading ? "Creating..." : "Create listing"}
//           </button>
//           {error && <p className="text-red-700 text-sm">{error}</p>}
//         </div>
//       </form>
//     </main>
//   );
// }
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const CreatePost = () => {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState([]);
    const [uploadError, setUploadError] = useState({ isError: false, message: '' });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ imgUrl: [] });
    const [isOffer, setIsoffer] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm({
        mode: "onChange"
    });

     const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwtbjre3q/upload";
  const UPLOAD_PRESET = "task_link";

    const handleImageUpload = async () => {
        if (imageFile.length > 0 && imageFile.length + formData.imgUrl.length < 7) {
            setLoading(true);
            const promises = [];
            for (let i = 0; i < imageFile.length; i++) {
                promises.push(uploadToCloudinary(imageFile[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({ ...formData, imgUrl: formData.imgUrl.concat(urls) });
                    setLoading(false);
                })
                .catch((error) => {
                    setUploadError({ ...uploadError, isError: true, message: error });
                    setLoading(false);
                });
        } else {
            setUploadError({ ...uploadError, isError: true, message: 'Select file first (max: 6)' });
            setLoading(false);
        }
    };

    const uploadToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("cloud_name", "your-cloud-name");

            fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.secure_url) {
                    resolve(data.secure_url);
                } else {
                    reject('Image upload failed');
                }
            })
            .catch(() => reject('Image upload failed'));
        });
    };

    const handleDelete = (index) => {
        setFormData({ ...formData, imgUrl: formData.imgUrl.filter((_, i) => i !== index) });
    };

    uploadError.isError && toast.error(uploadError.message, {
        autoClose: 2000,
    });

    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true);
            const res = await fetch('api/posts/create', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    imgUrl: formData.imgUrl,
                    userRef: currentUser._id
                })
            });
            const serverRes = await res.json();
            if (serverRes.success === false) {
                toast.error(serverRes.message, {
                    autoClose: 2000,
                });
                setFormSubmitLoading(false);
            } else {
                navigate(`/listing/${serverRes._id}`);
                setFormSubmitLoading(false);
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            });
            setFormSubmitLoading(false);
        }
    };

    return (
        <main >
            <section>
                <div className="container py-7 md:py-16 max-w-5xl">
                    <h1 className='text-center text-2xl font-heading font-bold text-black'>Create a Listing</h1>
                    <div className="mt-8 form_container">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className='feilds_container grid gap-5 md:gap-10  grid-col-1 md:grid-cols-2 items-start  '>



                                {/* ====== Form Sections Start Form Here ===== */}
                                <div className="info_container">
                                    <div className="input_feilds">

                                        <input
                                            id='title'
                                            type="text"
                                            placeholder='Work or Skill' name='title' className='form_input border-[1px]  focus:border-brand-blue rounded-md placeholder:text-sm '
                                            min={10} max={50}
                                            {...register('title', { required: 'This feild is required*' })}
                                        />
                                        {errors.title && <p className='text-red-700 text-xs'>{errors.title.message}</p>}

                                        <textarea
                                            id='description'
                                            type="text"
                                            placeholder='Experience'
                                            name='description'
                                            className='form_input border-[1px]  focus:border-brand-blue rounded-md placeholder:text-sm mt-3'
                                            {...register('description', { required: 'This feild is required*' })}
                                        />
                                        {errors.description && <p className='text-red-700 text-xs'>{errors.description.message}</p>}

                                        <input
                                            id='address'
                                            type="text"
                                            placeholder='Location'
                                            name='address'

                                            className='form_input border-[1px]  focus:border-brand-blue rounded-md placeholder:text-sm mt-3'
                                            {...register('address', { required: 'This feild is required*' })}
                                        />
                                        {errors.address && <p className='text-red-700 text-xs font-semibold'>{errors.address.message}</p>}
                                    </div>


                                    <div className="additional_info mt-6 max-w-xs">

                                        <div className="property_type">
                                            <p className='font-heading text-black'>Level of Skill</p>
                                            <div className="form-control mt-2">
                                                <label className="label cursor-pointer flex items-center justify-start gap-2
                                            ">
                                                    <input
                                                        type="radio"
                                                        name="Professional"
                                                        id='Professional'
                                                        required
                                                        value={'Professional'}
                                                        className="radio w-5 h-5 bg-transparent border border-solid border-gray-400  checked:bg-brand-blue checked:border-brand-blue dark:checked:bg-white dark:checked:border-brand-blue"
                                                        {...register('type')}
                                                    />

                                                    <span className="label-text font-medium">Professional</span>
                                                </label>
                                            </div>
                                            <div className="form-control ">
                                                <label className="label cursor-pointer flex items-center justify-start gap-2
                                            ">
                                                    <input
                                                        type="radio"
                                                        name="Intermediate"
                                                        id='Intermediate'
                                                        value={'Intermediate'}
                                                        required
                                                        className="radio w-5 h-5 bg-transparent border border-solid border-gray-400  checked:bg-brand-blue checked:border-brand-blue dark:checked:bg-white dark:checked:border-brand-blue"
                                                        {...register('type')}
                                                    />
                                                    <span className="label-text font-medium">Intermediate</span>
                                                </label>
                                            </div>
                                        </div>


                                        <div className="property_info mt-3">
                                            <p className='font-heading text-black'>General Information</p>
                                            <div className="max-w-[200px] flex items-center justify-between gap-2 mt-2">
                                                <span className='label-text font-medium'>No. of Years of Experience <small>(yrs)</small></span>
                                                <div>
                                                    <input
                                                        
                                                        className='border-2 focus:border-black rounded-md max-w-[84px] py-1 px-2 bg-white'
                                                        type="number"
                                                        name="area"
                                                        id="area"
                                                        {...register('area', { required: 'required' })}
                                                    />
                                                    {errors.area && <p className='text-red-700 text-xs font-semibold'>{errors.area.message}</p>}
                                                </div>

                                            </div>


                                            <div className="max-w-[200px]  flex items-center justify-between gap-2 mt-2">
                                                <span className='label-text font-medium'>No. of Hours can work in a day</span>
                                                <div>
                                                    <input
                                                        defaultValue={0}
                                                        className='border-2 focus:border-brand-blue rounded-md max-w-[84px] min-w-[84px]  py-1 px-2 bg-white'
                                                        min={1}
                                                        type="number"
                                                        name="beds"
                                                        id="bed"
                                                        {...register('bed', { required: 'required' })}
                                                    />
                                                    {errors.bed && <p className='text-red-700 text-xs font-semibold'>{errors.bed.message}</p>}
                                                </div>

                                            </div>
                                            <div className="max-w-[200px] flex items-center justify-between gap-2 mt-1">
                                                <span className='label-text font-medium'>Pincode</span>
                                                <div>
                                                    <input
                                                        defaultValue={0}
                                                        className='border-2 focus:border-brand-blue rounded-md max-w-[84px] min-w-[84px] py-1 px-2 bg-white'
                                                        
                                                        type="number"
                                                        name="beds"
                                                        id="bath"
                                                        {...register('bath', { required: 'required' })}
                                                    />
                                                    {errors.bath && <p className='text-red-700 text-xs font-semibold'>{errors.bath.message}</p>}
                                                </div>
                                            </div>
                                        </div>



                                        <div className="additional_feature mt-3">
                                            <p className='font-heading text-black'>Additional Information</p>
                                            <div className="form-control">
                                                <label className="label cursor-pointer flex items-center justify-start gap-2">
                                                    <input
                                                        id='parking'
                                                        type="checkbox"
                                                        name='parking'
                                                        className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-brand-blue"
                                                        {...register('parking')}
                                                    />
                                                    <span className="label-text font-medium" >Smoking</span>
                                                </label>
                                                <label className="label cursor-pointer flex items-center justify-start gap-2">
                                                    <input
                                                        id='furnished'
                                                        type="checkbox"
                                                        className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-brand-blue"
                                                        {...register('furnished')}
                                                    />
                                                    <span className="label-text font-medium" >Drinking</span>
                                                </label>

                                                <label className="label cursor-pointer flex items-center justify-start gap-2">
                                                    <input
                                                        id='offer'
                                                        type="checkbox"
                                                        className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-black"
                                                        {...register('offer')}
                                                        onChange={() => setIsoffer(!isOffer)}
                                                    />
                                                    <span className="label-text font-medium" >Do you have any discount?</span>
                                                </label>
                                            </div>
                                        </div>






                                        <div className=" mt-1">
                                            <div className="pricing_info flex flex-col">
                                                <p className="mt-3  font-heading text-black">Regular Price </p>
                                                <span className='text-sm font-content font-bold text-red-900'>(₹ /day)</span>
                                                <div className="flex flex-row mt-2 ">
                                                    <span className="flex items-center bg-grey-lighter rounded rounded-r-none px-2 font-bold text-grey-darker text-xl">₹</span>
                                                    <input
                                                        id='price'
                                                        type="number"
                                                        name="price"
                                                        className="bg-white p-2 rounded-md text-grey-darkest border-2 focus:border-black font-bold text-red-700 text-lg max-w-[200px]"
                                                        {...register('price', { required: 'This feild is required*' })}
                                                    />

                                                </div>
                                                {errors.price && <p className='text-red-700 text-xs font-semibold'>{errors.price.message}</p>}
                                            </div>
                                            {
                                                isOffer &&
                                                <div className="pricing_info flex flex-col">
                                                    <p className="mt-3  font-heading text-black">Discount Price </p>
                                                    <span className='text-sm font-content font-bold text-red-900'>(₹ /day)</span>
                                                    <div className="flex flex-row mt-2 ">
                                                        <span className="flex items-center bg-grey-lighter rounded rounded-r-none px-2 font-bold text-grey-darker text-xl">₹</span>
                                                        <input
                                                            id='discountPrice'
                                                            type="number"
                                                            name="discountPrice"
                                                            className="bg-slate-100 p-2 rounded-md text-grey-darkest border-2 focus:border-black font-bold text-red-700 text-lg max-w-[200px]"
                                                            {...register('discountPrice', {
                                                                required: 'This feild is required*',
                                                                validate: (value) => {
                                                                    const { price } = getValues();
                                                                    if (+price < +value) {
                                                                        return '*Discount price should be lower than regular price'
                                                                    }
                                                                }
                                                            })}
                                                        />

                                                    </div>
                                                    {errors.discountPrice && <p className='text-red-700 text-xs font-semibold'>{errors.discountPrice.message}</p>}
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>



                                {/* === Image Uploading Section Start Here === */}
                                <div>
                                    <p className='font-content text-[16px] mb-3 font-normal text-black'>
                                        <span className='font-semibold mr-1'>Note:</span>
                                        First image will be cover image (max:6)
                                    </p>
                                    <div className="image_upload_container md:p-5 md:border-2 bg-transparent border-dashed rounded-sm md:flex items-center justify-center gap-2">

                                        <input
                                            onChange={(e) => setImageFile(e.target.files)}
                                            required
                                            multiple accept='image/*' type="file"
                                            className={`file-input file:bg-black dark:bg-white bg-red-00 ${loading ? "md:w-4/6" : 'md:w-4/5'} w-full`} />
                                        <button
                                            disabled={loading || imageFile.length === 0}
                                            onClick={handleImageUpload}
                                            type='button' className={`w-full text-green-600 text-sm py-2 border-2 border-green-600 rounded-md mt-2 uppercase font-heading  ${loading ? "md:w-2/6" : 'md:w-1/5'} md:h-[3rem] md:mt-0 duration-500 hover:shadow-lg disabled:border-gray-500 disabled:text-gray-500`}>
                                            {
                                                loading ? 'Uploading...' : 'Upload'
                                            }
                                        </button>
                                    </div>
                                    <div>
                                        {
                                            formData.imgUrl.length > 0 && formData.imgUrl.map((imgSrc, index) => {
                                                return (
                                                    <div key={index} className="uploaded_images p-2 pr-5 border-2 mt-4  rounded-md flex items-center justify-between">
                                                        <img src={imgSrc} alt="property Image" className='w-24 h-20 object-cover rounded-md' />
                                                        <button
                                                            onClick={() => handleDelete(index)}
                                                            type='button'
                                                            className='font-medium text-lg text-red-700 flex items-center underline hover:opacity-75'>Delete</button>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="post_btn mt-7">
                                            <button

                                                disabled={formData.imgUrl.length < 1 || loading || formSubmitLoading}
                                                type='submit'
                                                className="w-full bg-black text-xl tracking-wider font-heading rounded-md hover:opacity-90 disabled:opacity-70 duration-300 text-white p-3">
                                                {
                                                    formSubmitLoading ? 'Creating...' : 'Create Post'
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </main>
    )
}

export default CreatePost
