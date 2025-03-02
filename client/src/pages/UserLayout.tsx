import { useEffect, useState } from "react"
import LoadingButton from "../components/LoadingButton"
import usePostAndPut from "../hooks/usePostAndPut"
import axios from "axios"

const UserLayout = () => {
    const defaultDataValues = {
        url: "",
        prompt: "",
    }
    const [data, setData] = useState(defaultDataValues)
    const post = usePostAndPut(axios.post)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target
        setData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await post.callApi("video-summerizer", data, false, false, true)
        console.log(response)
    }


    function removeEmptyStrings(array: string[]) {
        return array.filter(item => item !== "");
    }


    function formatResponse(text: string) {
        const paragraphs = text.trim().split('\n\n');
        let formattedText = '';
        paragraphs.forEach((item: string) => {
            if (item.trim().startsWith("**") && item.trim().endsWith("**")) {
                formattedText += `<strong class="text-xl text-white">${item.trim().slice(2, -2)}</strong>`;
            } else if (item.trim().startsWith("*")) {
                const listItemsArray = item.trim().split("\n");
                formattedText += "<ul>";
                listItemsArray.forEach((listItem) => {
                    let formattedListItem = listItem.trim().slice(1).trim();
                    if (formattedListItem.trim().startsWith("**")) {
                        removeEmptyStrings(formattedListItem.trim().split("**")).map((items, index) => {
                            if (index === 0) {
                                formattedText += `<strong class="text-white">${items.trim()}</strong>`;
                            } else {
                                formattedText += `<li>${items.trim()}</li>`;
                            }
                        });
                    } else {
                        formattedText += `<li>${formattedListItem.trim()}</li>`;
                    }
                });
                formattedText += "</ul>";
            } else {
                formattedText += `<p>${item.trim()}</p>`;
            }
        });

        return formattedText;
    }

    return (
        <div className="p-10" >
            <form onSubmit={handleSubmit} className="bg-base-300 rounded-2xl  p-8 flex flex-col items-start justify-start gap-3">
                <label className="floating-label w-full ">
                    <span>URL</span>
                    <input onChange={handleChange} type="text" id="url" placeholder="www.youtube.com/..." className="input input-md border-none w-full" />
                </label>
                <label className="floating-label w-full ">
                    <span>Your Prompt</span>
                    <input onChange={handleChange} type="text" id="prompt" placeholder="eg.summerize the key points..." className="input input-md border-none w-full" />
                </label>
                {
                    post.loading ?
                        <LoadingButton message={"Generating"} /> :
                        <button type="submit" className="btn btn-soft btn-success">submit</button>
                }
            </form>

            {
                post?.response?.data[1] &&
                <div dangerouslySetInnerHTML={{ __html: formatResponse(post?.response?.data[1]) }} className="  bg-base-300 rounded-2xl  p-8 mt-4" ></div>
            }
        </div>
    )
}

export default UserLayout