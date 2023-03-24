import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Hero from "../components/Hero";
import BreadCrumb from "../components/BreadCrumb";
import ContactForm from "../components/Contact/ContactForm";
import ContactDetails from "../components/Contact/ContactDetails";
import "../css/contact.css";

const Contact = () => {
  return (
    <>
      <Hero
        name={{
          EN: "The Future belongs to you",
          AR: "The Future belongs to you",
        }}
        description={{
          EN: "Tech Mind an academic for teaching computer science fields.It aims to help students by providing high quality and valuable content. In addition to developing their personal skills to produce a generation that is aware of the requirements of the labor market.",
          AR: "Tech Mind هي أكاديمية لتدريس مجالات علوم الكمبيوتر ، وتهدف إلى مساعدة الطلاب من خلال توفير محتوى عالي الجودة وقيِّم. بالإضافة إلى تنمية مهاراتهم الشخصية لإنتاج جيل واعي بمتطلبات سوق العمل.",
        }}
        noBtn={true}
      />
      <BreadCrumb />
      <div className="mt-5">
        <Container>
          <Row>
            <Col lg={8} className="mb-5">
              <ContactForm />
            </Col>
            <Col lg={4} className="mb-5">
              <ContactDetails />
            </Col>
          </Row>
        </Container>
      </div>
      <div
        style={{
          marginBottom: "80px",
        }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.642283832278!2d31.48964518487191!3d30.587642081687974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7f054c47e8509%3A0xceeef2c84c7f078b!2z2KfZhNmF2KzYsdip!5e0!3m2!1sar!2seg!4v1679685329276!5m2!1sar!2seg"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"></iframe>
      </div>
    </>
  );
};

export default Contact;
