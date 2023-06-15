import { useEffect, useState } from "react";
import { IUserData, IUserRepos } from "../helpers/interfaces";
import RepoInfo from "./RepoInfo";

const GitHubUser = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<IUserData>();
  const [userRepos, setUserRepos] = useState<[IUserRepos]>();

  useEffect(() => {
    if (userName !== "") {
      fetch(`https://api.github.com/users/${userName}`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            showMsg("Ese nombre de usuario no existe");
          }
        })
        .then((result) => setUserData(result))
        .catch(() => {
          showMsg("Ha ocurrido un error");
        });

      fetch(`https://api.github.com/users/${userName}/repos`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => setUserRepos(result))
        .catch();
    }
  }, [userName]);

  const showMsg = (text: string) => {
    const $span = document.querySelector("span") as HTMLSpanElement;
    $span.innerText = text;
    $span?.classList.remove("hidden");
    $span?.classList.add("block");
  };

  const validateForm = () => {
    const $githubUserInput = document.querySelector(
      "#github-user"
    ) as HTMLInputElement;
    const $span = document.querySelector("span");

    if ($githubUserInput.value !== "") {
      $span?.classList.remove("block");
      $span?.classList.add("hidden");
      setUserName($githubUserInput.value);
    } else {
      showMsg("Introduce un nombre de usuario");
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center mt-5">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            id="github-user"
            className="bg-blue-50 border border-blue-500 text-blue-900 placeholder-blue-500 text-sm rounded-lg block p-2.5"
            placeholder="Nombre de usuario"
          />
          <button
            onClick={validateForm}
            className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Buscar
          </button>
        </div>
        <span className="font-medium mt-2 text-sm text-red-500 hidden"></span>
      </section>

      {userData !== undefined ? (
        <section className="text-center mt-5">
          <div className="flex flex-col gap-1 items-center">
            <img
              src={userData.avatar_url}
              className="w-32 h-32 rounded-full"
              alt={userData.name}
            />
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-base">{userData.bio}</p>
            <p className="text-base">{userData.followers} seguidores</p>
            <p className="text-base">
              {userData.public_repos} repositorios públicos
            </p>
          </div>
        </section>
      ) : undefined}

      {userRepos !== undefined ? (
        <section>
          <h2>Repositorios públicos</h2>
          {userRepos.map((el: IUserRepos, index: number) => (
            <RepoInfo name={el.name} description={el.description} key={index} />
          ))}
        </section>
      ) : undefined}
    </>
  );
};

export default GitHubUser;
