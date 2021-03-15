import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BannerCTA.scss";
import { SmallText } from "../../../smalltext/SmallText";

type BannerCTAProps = {
  image?: string;
  imagePosition?: "left" | "right";
  headline: string;
  subtitle?: string;
  children?: JSX.Element | JSX.Element[];
};

export const BannerCTA = ({
  image,
  imagePosition = "left",
  headline,
  subtitle,
  children,
}: BannerCTAProps) => {
  const [dimension, setDimension] = React.useState({ width: 0, height: 0 });
  const colRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (colRef.current) {
      const col = colRef.current;
      const colRect = col.getBoundingClientRect();
      setDimension({
        width: Math.round(colRect.width),
        height: Math.round(colRect.height),
      });
    }
  }, [colRef]);

  let imageElement: JSX.Element | undefined;
  if (imagePosition === "left") {
    imageElement = (
      <Col
        className="no-gutters px-0 d-none d-md-block"
        md={6}
        sm={12}
        ref={colRef}
      >
        <Image
          src={
            image ||
            `https://via.placeholder.com/${dimension.width}x${dimension.height}`
          }
          alt={"Banner Image"}
          loading="lazy"
          decoding="async"
        />
      </Col>
    );
  } else {
    imageElement = (
      <Col
        md={6}
        sm={12}
        ref={colRef}
        className="order-2 no-gutters px-0 d-none d-md-block"
      >
        <Image
          src={
            image ||
            `https://via.placeholder.com/${dimension.width}x${dimension.height}`
          }
          alt={"Banner Image"}
          loading="lazy"
          decoding="async"
        />
      </Col>
    );
  }

  return (
    <Container className="my-5 bg-light" fluid>
      <Row>
        {imageElement}
        <Col
          md={6}
          sm={12}
          className="banner-content d-flex align-items-start justify-content-center flex-column"
        >
          <h1 className="mb-4">{headline}</h1>
          <SmallText>{subtitle}</SmallText>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
