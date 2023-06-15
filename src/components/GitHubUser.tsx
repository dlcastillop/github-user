import { useEffect, useState } from "react";
import IUserData from "../helpers/interfaces";

const GitHubUser = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<IUserData>();

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
            const $span = document.querySelector("span") as HTMLSpanElement;
            $span.innerText = "Ese nombre de usuario no existe";
            $span?.classList.remove("hide");
            $span?.classList.add("show");
          }
        })
        .then((result) => setUserData(result))
        .catch(() => {
          const $span = document.querySelector("span") as HTMLSpanElement;
          $span.innerText = "Ha ocurrido un error";
          $span?.classList.remove("hide");
          $span?.classList.add("show");
        });
    }
  }, [userName]);

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
      $span?.classList.remove("hide");
      $span?.classList.add("show");
    }
  };

  return (
    <div className="form-container">
      <input
        type="text"
        name="github-user"
        id="github-user"
        placeholder="Introduce el nombre de usuario de GitHub"
      />
      <span className="hide">Introduce un nombre de usuario</span>
      <button onClick={validateForm}>Buscar</button>
    </div>
  );
};

export default GitHubUser;
