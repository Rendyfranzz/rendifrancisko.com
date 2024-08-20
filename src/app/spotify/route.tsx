import querystring from 'querystring';
/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import {} from 'next';
import { NextResponse } from 'next/server';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

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
      grant_type: 'refresh_token',
      refresh_token,
    }),
    {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return res.data.access_token;
};

export const getNowPlaying = async () => {
  const access_token = await getAccessToken();

  return await axios.get<SpotifyData>(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (
      response.status === 204 ||
      response.status > 400 ||
      response.data.currently_playing_type !== 'track'
    ) {
      // Set cache control headers
      const res = NextResponse.json({ isPlaying: false });
      res.headers.set(
        'Cache-Control',
        'public, s-maxage=180, stale-while-revalidate=90',
      );
      return res;
    }

    const data = {
      isPlaying: response.data.is_playing,
      title: response.data.item.name,
      album: response.data.item.album.name,
      artist: response.data.item.album.artists
        .map((artist: { name: string }) => artist.name)
        .join(', '),
      albumImageUrl: response.data.item.album.images[0].url,
      songUrl: response.data.item.external_urls.spotify,
    };

    // Set cache control headers
    const res = NextResponse.json(data);
    res.headers.set(
      'Cache-Control',
      'public, s-maxage=180, stale-while-revalidate=90',
    );
    return res;
  } catch (error) {
    // Handle unexpected errors
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
