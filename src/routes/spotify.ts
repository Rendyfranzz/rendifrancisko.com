import querystring from "node:querystring";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

const {
	SPOTIFY_CLIENT_ID: clientId,
	SPOTIFY_CLIENT_SECRET: clientSecret,
	SPOTIFY_REFRESH_TOKEN: refreshToken,
} = process.env;

const token = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const NOW_PLAYING_ENDPOINT =
	"https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

interface SpotifyData {
	is_playing: boolean;
	item: {
		name: string;
		album: {
			name: string;
			artists: Array<{ name: string }>;
			images: [{ url: string }];
		};
		external_urls: {
			spotify: string;
		};
	};
	currently_playing_type: string;
}

const getAccessToken = async () => {
	const res = await axios.post<{ access_token: string }>(
		TOKEN_ENDPOINT,
		querystring.stringify({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}),
		{
			headers: {
				Authorization: `Basic ${token}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		},
	);

	return res.data.access_token;
};

const getNowPlaying = async () => {
	const accessToken = await getAccessToken();

	return await axios.get<SpotifyData>(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

const notPlayingResponse = () => {
	const res = Response.json({ isPlaying: false });
	res.headers.set(
		"Cache-Control",
		"public, s-maxage=180, stale-while-revalidate=90",
	);
	return res;
};

const hasSpotifyEnv = () => Boolean(clientId && clientSecret && refreshToken);

export const Route = createFileRoute("/spotify")({
	server: {
		handlers: {
			GET: async () => {
				try {
					if (!hasSpotifyEnv()) {
						return notPlayingResponse();
					}

					const response = await getNowPlaying();

					if (
						response.status === 204 ||
						response.status > 400 ||
						response.data.currently_playing_type !== "track"
					) {
						return notPlayingResponse();
					}

					const data = {
						isPlaying: response.data.is_playing,
						title: response.data.item.name,
						album: response.data.item.album.name,
						artist: response.data.item.album.artists
							.map((artist) => artist.name)
							.join(", "),
						albumImageUrl: response.data.item.album.images[0].url,
						songUrl: response.data.item.external_urls.spotify,
					};

					const res = Response.json(data);
					res.headers.set(
						"Cache-Control",
						"public, s-maxage=180, stale-while-revalidate=90",
					);
					return res;
				} catch (error) {
					console.error("Error fetching data:", error);
					return notPlayingResponse();
				}
			},
		},
	},
});
