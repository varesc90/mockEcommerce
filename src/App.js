import React, {useState, useEffect} from 'react';
import {Row, Container, Col, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import './App.css';
import './style/main-style.scss';
import data from './data/list.json';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

function App() {

    const perPage = 8;
    const [page, setPage] = useState(1);
    const [startRecord, setStartRecord] = useState(1);
    const [endRecord, setEndRecord] = useState(6);

    useEffect( () => {
        const start = (page * perPage == perPage ? 1 : (page - 1) * perPage + 1);
        const end = (start + perPage > data.length ? data.length : start + perPage - 1);
        setStartRecord(start);
        setEndRecord(end);
    });

    const formatCreatedAt = (createdAt) => {
        const now = moment();
        return `${now.diff(createdAt, 'weeks')} weeks ago`;
    }

    const formatVote = (vote) => {
        const newVote = [];
        if(vote > 0){
            for (var x = 0; x < vote; x++) {
                newVote.push(<i class="fa fa-star"/>);
            }
            return newVote;
        }
        return "-";

    }

    const formatCurrency = (price) => {
        return `$ ${price.toLocaleString()}`;
    }


    const dataRenderer = () => {

        const filterData = data.filter((ddt,index) => {
            return index >= startRecord-1 && index < endRecord
        });
        return filterData.map((dt) => {

            return (
                <Col md="3">
                    <div className="one-item">
                        <li><img className="img-fluid" src={dt.image_url}/></li>
                        <li className="title">{dt.title}</li>
                        <li>{formatCreatedAt(dt.created_at)}</li>
                        <li className="vote">{formatVote(dt.vote)}</li>
                        <li>{formatCurrency(dt.price)}</li>
                    </div>
                </Col>
            );
        });
    }


    const paginationRenderer = (
        <Row className="custom-pagination">
            <Pagination aria-label="Page navigation example">
                <PaginationItem
                    active={(page == 1)}
                >
                    <PaginationLink onClick={() => setPage(1)} href="#">
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem
                    active={(page == 2)}>
                    <PaginationLink onClick={() => setPage(2)} href="#">
                        2
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </Row>
    );

    return (
        <div className="App">
            <Row className="m-3 page-detail">Items {startRecord} - {endRecord} of {data.length}</Row>
            <Row>
                {dataRenderer()}
            </Row>
            {paginationRenderer}
        </div>
    );


}

export default App;
