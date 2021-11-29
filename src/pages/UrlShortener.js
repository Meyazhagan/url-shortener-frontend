import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import CreateUrl from "../components/CreateUrl";
import { UrlContext } from "../context/UrlShortenerContext";
import { getToken, removeToken } from "../services/AuthServices";

function UrlShortener() {
  const { urls, onDelete, getAll, getUser } = useContext(UrlContext);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col p-5">
      <div className=" shadow-2xl p-10 rounded-xl min-h-screen">
        <div className="flex justify-between items-center flex-col-reverse gap-6 md:flex-row">
          <CreateUrl />
          <div className="flex justify-center self-end gap-6">
            <div>{getUser()}</div>
            <button
              onClick={() => {
                removeToken();
                navigate("/");
              }}
              className="text-red-600 font-bold"
            >
              Logout
            </button>
          </div>
        </div>
        <div className=" w-full mt-10 overflow-auto whitespace-nowrap">
          <button
            onClick={() => getAll()}
            className="text-green-600 border-2 border-green-600 rounded-md px-3 mb-4 font-bold
            hover:bg-green-600 hover:text-white
            "
          >
            <i class="fas fa-sync-alt text-xs mr-3"></i>
            Refresh
          </button>
          {urls.length > 0 ? (
            <table className="w-full ">
              <thead>
                <tr className="border-b-4">
                  <th>#</th>
                  <th>URL</th>
                  <th>Shortened URL</th>
                  <th>No of Clicks</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url, index) => (
                  <tr className="border-t-2 hover:bg-gray-100" key={index}>
                    <td className="p-4 text-center">{index + 1}</td>
                    <td className="p-4 text-center">{url.url}</td>
                    <td className="p-4 text-center">
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        className="text-blue-800 hover:underline"
                      >
                        {url.shortUrl}
                      </a>
                    </td>
                    <td className="p-4 text-center">{url.clicked}</td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => onDelete(url._id)}
                        className="text-red-600 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>There is no URL Present. Add New URLs</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UrlShortener;
