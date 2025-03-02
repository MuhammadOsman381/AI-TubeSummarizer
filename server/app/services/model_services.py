import asyncio
from youtube_transcript_api import YouTubeTranscriptApi # type: ignore
from urllib.parse import urlparse, parse_qs
from google import genai
import os
from dotenv import load_dotenv # type: ignore

load_dotenv() 

def get_video_id(url):
    parsed_url = urlparse(url)
    if parsed_url.netloc in ["www.youtube.com", "youtube.com"]:
        query_params = parse_qs(parsed_url.query)
        return query_params.get("v", [None])[0]
    elif parsed_url.netloc in ["youtu.be"]:
        return parsed_url.path.lstrip("/")
    return None  

def get_transcript(url):
    video_id = get_video_id(url)
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    text = " ".join([entry['text'] for entry in transcript])
    return text

def prompt_handler(transcript, prompt):
    client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=f"user-prompt:{prompt} transcript:{transcript}"
    )
    return response.text
