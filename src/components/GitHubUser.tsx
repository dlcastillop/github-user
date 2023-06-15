const GitHubUser = () => {
  async function search() {
    const $githubUserInput = document.querySelector(
      "#github-user"
    ) as HTMLInputElement;
    const $span = document.querySelector("span");

    if ($githubUserInput.value !== "") {
      $span?.classList.remove("show");
      $span?.classList.add("hide");
    } else {
      $span?.classList.remove("hide");
      $span?.classList.add("show");
    }
  }

  return (
    <div className="form-container">
      <input
        type="text"
        name="github-user"
        id="github-user"
        placeholder="Introduce el nombre de usuario de GitHub"
      />
      <span className="hide">Introduce un nombre de usuario</span>
      <button onClick={search}>Buscar</button>
    </div>
  );
};

export default GitHubUser;
