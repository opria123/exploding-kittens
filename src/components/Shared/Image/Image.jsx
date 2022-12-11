import styled from "styled-components";

const Root = styled.div`
  position: relative;
  padding-top: ${(props) => props.ratio * 100}%;

  img {
    position: absolute;
    width:85%;
    height: 85%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // object-fit: cover;
    cursor: inherit;
  }
`;

export default function Image({ src, alt = " ", ratio = 9 / 16, ...props }) {
  return (
    <Root ratio={ratio} {...props}>
      <img src={src} alt={alt} />
    </Root>
  );
}
