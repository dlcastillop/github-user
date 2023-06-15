import { useEffect, useState } from "react";
import { IUserData, IUserRepos } from "../helpers/interfaces";

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
    $span?.classList.remove("hide");
    $span?.classList.add("show");
  };

  const validateForm = () => {
    const $githubUserInput = document.querySelector(
      "#github-user"
    ) as HTMLInputElement;
    const $span = document.querySelector("span");

    if ($githubUserInput.value !== "") {
      $span?.classList.remove("show");
      $span?.classList.add("hide");
      setUserName($githubUserInput.value);
    } else {
      showMsg("Introduce un nombre de usuario");
    }
  };

  return (
    <>
      <div className="form-container">
        <input
          type="text"
          name="github-user"
          id="github-user"
          placeholder="Introduce el nombre de usuario de GitHub"
        />
        <span className="hide"></span>
        <button onClick={validateForm}>Buscar</button>
      </div>

      {userData !== undefined ? (
        <div>
          <img src={userData.avatar_url} alt={userData.name} />
          <h1>{userData.name}</h1>
          <p>{userData.bio}</p>
          <p>Seguidores: {userData.followers}</p>
          <p>Repositorios públicos: {userData.public_repos}</p>
        </div>
      ) : undefined}

      {userRepos !== undefined ? (
        <section>
          <h2>Repositorios públicos</h2>
          {userRepos.map((el: IUserRepos) => (
            <div>
              <p>{el.name}</p>
              <p>{el.description}</p>
            </div>
          ))}
        </section>
      ) : undefined}
    </>
  );
};

export default GitHubUser;
