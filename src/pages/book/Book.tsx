import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import BookType from "../../type/BookType";
import { useNavigate } from "react-router-dom";

function Book() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tag, setTag] = useState<string | null>(null);
  const [data, setData] = useState<BookType[]>([]);
  const [take, setTake] = useState(20);
  const [skip, setSkip] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const searchBook = async (query: string | null = "") => {
    const endPoint = `http://localhost:8000/api/bookstore/books?`;
    const params = `keyword=${query ? query : ""}&tag=${
      tag ? tag : ""
    }&take=${take}&skip=0`;
    //setKeyword(query);
    console.log("searchData : ", endPoint + params);
    await axios({
      method: "get",
      url: endPoint + params,
    })
      .then(function (res) {
        console.log(res.code);
        if (res?.code === "ERR_BAD_REQUEST") navigate("/login");
        setData(res.data);
        // setSkip(take);
        // setHasMore(true);
        if (res.data.length < take) {
          setHasMore(false);
          setSkip(0);
        } else {
          setSkip(take);
          setHasMore(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.code === "ERR_BAD_REQUEST") navigate("/login");
      });
  };

  const fetchMoreBook = async () => {
    const endPoint = `http://localhost:8000/api/bookstore/books?`;
    const params = `keyword=${keyword ? keyword : ""}&tag=${
      tag ? tag : ""
    }&take=${take}&skip=${skip}`;
    //console.log("url : ", endPoint + params);
    await axios({
      method: "get",
      url: endPoint + params,
    })
      .then(function (res) {
        setData([...data, ...res.data]);
        setSkip(skip + take);
        //console.log(data);
        if (res.data.length < take) setHasMore(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSearchBook = (event) => {
    event.preventDefault();
    setTag(null);
    setSearchParams("");
    setKeyword(event.target[0].value);
    searchBook(event.target[0].value);
  };

  useEffect(() => {
    //console.log(searchParams.get("tag"));
    if (searchParams.get("tag"))
      setTag(
        searchParams.get("tag") === "all" ? null : searchParams.get("tag")
      );
    searchBook(keyword);
  }, [tag, searchParams]);

  return (
    <div>
      <div className="mt-3 ms-3">
        <form className="d-flex search-form" onSubmit={handleSearchBook}>
          <input
            className="form-control search-input me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-warning fs-7" type="submit">
            Search
          </button>
        </form>
        <div className="d-flex flex-wrap mt-3">
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreBook}
            hasMore={hasMore}
            scrollThreshold={0.8}
            loader={
              <div className="my-3 d-flex justify-content-center w-75">
                <FaSpinner className="loaderIcon" size="2em" color="gray" />
              </div>
            }
          >
            {data?.map((bk: BookType, i: number) => (
              <Link
                to={`${bk.id}`}
                className="text-decoration-none me-4 mb-4"
                key={i}
              >
                <Card
                  title={bk.title}
                  writer={bk.writer}
                  cover={bk.cover}
                  price={bk.price}
                  tag={bk.tag}
                />
              </Link>
            ))}
          </InfiniteScroll>
        </div>
        {!hasMore && (
          <div className="text-center">
            <p>you have seen it all</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
