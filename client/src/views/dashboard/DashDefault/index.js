import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';

const DashDefault = () => {
    return (
        <React.Fragment>
            <Row>
               
 
                <Col md={12} xl={12}>
                    <Card className="Recent-Users">
                        <Card.Header>
                            <Card.Title as="h5">Recent Users</Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <Table responsive hover>
                                <tbody>
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted">
                                                <i className="fa fa-circle text-c-green f-10 m-r-15" />
                                                11 MAY 12:56
                                            </h6>
                                        </td>
                                        <td>
                                            <Link to="#" className="label theme-bg2 text-white f-12">
                                                Reject
                                            </Link>
                                            <Link to="#" className="label theme-bg text-white f-12">
                                                Approve
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Mathilde Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted">
                                                <i className="fa fa-circle text-c-red f-10 m-r-15" />
                                                11 MAY 10:35
                                            </h6>
                                        </td>
                                        <td>
                                            <Link to="#" className="label theme-bg2 text-white f-12">
                                                Reject
                                            </Link>
                                            <Link to="#" className="label theme-bg text-white f-12">
                                                Approve
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted">
                                                <i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38
                                            </h6>
                                        </td>
                                        <td>
                                            <Link to="#" className="label theme-bg2 text-white f-12">
                                                Reject
                                            </Link>
                                            <Link to="#" className="label theme-bg text-white f-12">
                                                Approve
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Ida Jorgensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted f-w-300">
                                                <i className="fa fa-circle text-c-red f-10 m-r-15" />
                                                19 MAY 12:56
                                            </h6>
                                        </td>
                                        <td>
                                            <Link to="#" className="label theme-bg2 text-white f-12">
                                                Reject
                                            </Link>
                                            <Link to="#" className="label theme-bg text-white f-12">
                                                Approve
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Albert Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted">
                                                <i className="fa fa-circle text-c-green f-10 m-r-15" />
                                                21 July 12:56
                                            </h6>
                                        </td>
                                        <td>
                                            <Link to="#" className="label theme-bg2 text-white f-12">
                                                Reject
                                            </Link>
                                            <Link to="#" className="label theme-bg text-white f-12">
                                                Approve
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
