import { IRepoInfoProps } from "../helpers/interfaces";

const RepoInfo = ({ name, description }: IRepoInfoProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default RepoInfo;
