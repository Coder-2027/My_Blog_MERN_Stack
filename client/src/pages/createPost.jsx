import React, { useState } from "react";
import { TextInput, Select, FileInput, Button, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    // setImageFileUploadError(null);
    // setImageFileUploading(true);
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload error: " + { error });
          setImageUploadProgress(0);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            // setImageFileUrl(downloadURL);
            setFormData({ ...formData, image: downloadURL });
            // setImageFileUploading(false);
            setImageUploadError(null);
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed: " + error);
      setImageUploadProgress(null);
    }
  };

  const handleFileInputChange = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // console.log("hello");

      const data = await res.json();
      // console.log(res.ok);
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
      else {
        setPublishError(null);
        // console.log(data.data);
        navigate(`/post/${data.data.slug}`)
      }
      
    } catch (error) {
      setPublishError("Something went wrong")
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <Select className="flex-1" onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <div className="rounded-sm border w-full h-72">
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-full object-cover "
            />
          </div>
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-12 "
          required
          onChange={(value) => setFormData({...formData, content: value})}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>

        {publishError && <Alert color="failure" className="mt-5">{publishError}</Alert>}
      </form>
    </div>
  );
}

export default CreatePost;
