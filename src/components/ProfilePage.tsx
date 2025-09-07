// ProfilePage.tsx
import { useParams } from "react-router-dom";
import { ProfileContent } from "./ProfileContent";
import { Playlist } from "../model/Playlist";
import {getPlaylists} from "../MockedPlaylistStore";

type UserData = {
  id: string;
  name: string;
  avatarUrl?: string;
  followers: number;
  following: number;
  playlists: Playlist[];
};

export const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const playlists = getPlaylists()
  const user: UserData = {
    name: "Odeyalo",
    avatarUrl: "https://i.pinimg.com/736x/16/76/32/167632879f6b035992e0a0fad48df605.jpg",
    followers: 1,
    following: 2,
    playlists: playlists,
    id: "sadas21"
  };

  if (!user) return <div>Loading...</div>;

  return <ProfileContent user={user} />;
};
