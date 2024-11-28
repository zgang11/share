"use strict";

import React, { useReducer, useEffect, useState } from "react";
import Frame from "component/frame";
import "./index.css";
import { Pagination } from "antd";
import { ebookList } from "../../utils/api";
import { format } from "date-fns";

const Home = (props) => {
  function reducer(state, action) {
      return { ...state, ...action };
  }
  const [pagination, dispatch] = useReducer(reducer, {
    total: 0,
    pageSize: 10,
    pageNum: 1,
  });
  const [list, setList] = useState([]);

  const getVideoList = (pageNum, pageSize) => {
    const body = {
      pageNum: pageNum || pagination.pageNum,
      pageSize: pageSize || pagination.pageSize,
    };
    ebookList(body).then((res) => {
      const { total = 0, list = [] } = res.data;
      setList(list);
      dispatch({ total, pageSize: body.pageSize, pageNum: body.pageNum });
    });
  };

  const goDetail = (id) => {
    location.href = `/${id}`;
  };

  const onPaginationChange = (pageNum, pageSize) => {
    getVideoList(pageNum, pageSize);
    // getVideoList();
  };

  useEffect(() => {
    getVideoList();
  }, []);

  return (
    <Frame>
      <div className="card-wrapper">
        {list.map((item) => {
          return (
            <div className="card" key={item.id} onClick={() => goDetail(item.id)}>
              <div className="card-img-wrapper">
                <img className="card-img" src={item.cover} alt="" />
              </div>
              <div className="card-title">{item.title}</div>
              <div className="card-info">
                {format(item.createTime, "YYYY-M-d H:mm:ss")}
                &nbsp;&nbsp;
                {`访问量:${item.showCount ?? 0}`}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination-wrapper">
        <Pagination
          total={pagination.total}
          showTotal={(total) => `共 ${total} 项`}
          defaultPageSize={pagination.pageSize}
          defaultCurrent={pagination.pageNum}
          onChange={onPaginationChange}
          showSizeChanger={true}
          pageSizeOptions={["10", "20", "50"]}
        />
      </div>
    </Frame>
  );
};

export default Home;
