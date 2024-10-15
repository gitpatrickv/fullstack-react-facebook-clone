import { Image } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import PostImage from "../../../entities/PostImage";

interface Props {
  images: PostImage;
}

const PhotoCard = ({ images }: Props) => {
  const location = useLocation();
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  return (
    <>
      <Image
        src={images.postImageUrl || pic}
        height={location.pathname === `/profile/${userId}` ? "130px" : "180px"}
        width="100%"
        borderRadius="10px"
        cursor="pointer"
      />
    </>
  );
};

export default PhotoCard;
