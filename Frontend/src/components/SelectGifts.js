import {useState} from "react";
import {Card, Col, Button, Form, Container, Image, Row, Modal, Alert} from "react-bootstrap";

let COINS = 1000
const SelectGifts = () => {
    const [msg, setMsg] = useState("")
    const [isDone, setIsDone] = useState(false)
    const [gifts, setGifts] = useState([
        {
            _id: 1,
            Name: "Airpod",
            image: "https://tse2.mm.bing.net/th?id=OIP.SDPSNNGWcje3D2AqelhNtAHaEL&pid=Api&P=0&h=180",
            coins: 100,
        },
        {
            _id: 2,
            Name: "Airpod",
            image: "https://tse2.mm.bing.net/th?id=OIP.SDPSNNGWcje3D2AqelhNtAHaEL&pid=Api&P=0&h=180",
            coins: 100,
        }])
    const [selectedGift, setSelectedGift] = useState(null)
    const clear = () => {
        setSelectedGift(null)
        setMsg("")
    }

    const buyGift = async (selectedGift) => {
        if (COINS >= selectedGift.coins) {
            COINS -= selectedGift.coins;
            setMsg(`תודה רבה על הקניה ,המשלוח יגיע בקרוב לכתובת ${selectedGift.address}`)
            setIsDone(true)
            selectedGift = null;
        } else {
            setMsg("אין לך מספיק מטבעות");
        }
    }

    return (
        <div className="mt-5 container-fluid mx-auto bg-light rounded border border-dark">
            <h1 className="text-center my-5"> בחירת מתנות &#128522;</h1>
            <h3 className="text-center my-5"> יש לך {COINS} &#128176;</h3>
            <Row>
                {gifts ? gifts.map((item) =>
                        <Col sm={6} md={3} key={item._id} className={"mx-5 my-3"}>
                            <Card style={{width: '18rem'}}>
                                <Card.Img variant="top" src={item.image} className={" mx-auto"} alt={item.Name}/>
                                <Card.Body>
                                    <Row>
                                        <Col sm={6}>
                                            <Row>
                                                <Card.Text>
                                                    <label htmlFor={item._id}>{item.Name}</label>
                                                </Card.Text>
                                            </Row>
                                        </Col>
                                        <Col sm={6} className={"text-start"}>

                                            {item.coins} <i className="fas fa-coins fa-2x"></i>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary" onClick={() => {
                                        setSelectedGift(item)
                                    }}>קנה</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                    : <h1>אין מתנות זמינות</h1>}
            </Row>
            <Modal show={selectedGift} onHide={() => {
                setSelectedGift(null);
                setMsg("");
            }}>
                <Modal.Header closeButton>
                    <Modal.Title> קניית מתנה </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <Image src={selectedGift?.image} alt={selectedGift?.Name} fluid/>
                                <p>מטבעות: {selectedGift?.coins} <i className="fas fa-coins fa-lg"></i></p>
                            </Col>
                            {!isDone &&
                            <Col sm={6}>
                                <p>{selectedGift?.Name}</p>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>כתובת מגורים</Form.Label>
                                    <Form.Control type="text" placeholder="הכנס כתובת מגורים" required value={selectedGift?.address} onChange={(e) => {
                                        selectedGift.address = e.target.value
                                    }}/>
                                </Form.Group>
                                <Button variant="primary" className={'my-2'} size={'sm'} disabled={msg !== ""}
                                        onClick={() => {
                                            buyGift(selectedGift)
                                        }}>
                                    <i className="fas fa-shopping-cart"></i> קנה</Button>
                            </Col>}
                        </Row>
                        <Row>
                            <Alert variant="success" show={msg !== ""}>
                                {msg}
                            </Alert>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={clear}>
                        סגור
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default SelectGifts;
