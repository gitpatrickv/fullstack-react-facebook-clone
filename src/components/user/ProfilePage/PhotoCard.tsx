import { Image } from "@chakra-ui/react";
import pic from "../../../assets/profpic.jpeg";
import PostImage from "../../../entities/PostImage";

interface Props {
  images: PostImage;
}

const PhotoCard = ({ images }: Props) => {
  return (
    <>
      <Image
        src={images.postImageUrl || pic}
        height="180px"
        width="200px"
        borderRadius="10px"
        cursor="pointer"
      />
    </>
  );
};

export default PhotoCard;
