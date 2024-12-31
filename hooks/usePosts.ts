import { PROD } from "@/constants/Links"
import axios from "axios"
import { VideoData } from "@/types/VideoData"



const getAllPosts  = async (): Promise<VideoData[]> => {
const allPosts = await axios.get(`${PROD}/posts/fetch/all`)
const vlmap = allPosts.data.posts.map((el: any) => {return {videos: [el.video_link], user: el.username, id: el.id}})
return vlmap;
}

export {getAllPosts}