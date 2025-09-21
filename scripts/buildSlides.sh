repo_name=$1

if [[ -z $repo_name ]]; then
  echo "Repository name must be provided as a 1-st argument"
  exit 1
fi

for filepath in slides/1*.md; do
  filename=$(basename ${filepath})
  filename_without_ext=$(echo $filename | cut -d"." -f1)

  yarn build $filepath --base "/$repo_name/$filename_without_ext" --out "../dist/$filename_without_ext"
done