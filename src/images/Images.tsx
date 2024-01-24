interface ImagePaths {
  [key: string]: string;
}

const Images: ImagePaths = {
  Rock : new URL('./rock.png', import.meta.url).href,
  Paper : new URL('./paper.png', import.meta.url).href,
  Scissors : new URL('./scissors.png', import.meta.url).href,
  rcp : new URL('./rcp.png', import.meta.url).href,
}

export default Images;