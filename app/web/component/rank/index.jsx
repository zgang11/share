import React from "react";
import "./index.css";

const Rank = ({ rankIcon, title = "榜单", href, list = [] }) => {
  return <div className="rank-container">
    <div className="rank-title" style={{ backgroundImage: "url(" + rankIcon + ")" }}>{title}</div>
    {list.map((item) => {
      return <div key={item.id} className="rank-item" onClick={() => { location.href = '/' + item.id + href }}>
        <img className="rank-item-cover" src={item.cover} />
        <div className="rank-item-right">
          <span className="rank-item-title">{item.title}</span>
        </div>
      </div>
    })}
  </div>;
};
export default Rank;
