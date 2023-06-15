import { IRepoInfoProps } from "../helpers/interfaces";

const RepoInfo = ({ name, description }: IRepoInfoProps) => {
  return (
    <div className="p-3 bg-blue-800 border border-blue-200 rounded-lg shadow text-white">
      <h3 className="mb-2 text-lg font-bold tracking-tight">{name}</h3>
      <p className="font-normal">{description}</p>
    </div>
  );
};

export default RepoInfo;
