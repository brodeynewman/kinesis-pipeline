function run_cf_deploy {
  echo "--- Running deploy for: [${1}] ---"

  aws cloudformation deploy --no-fail-on-empty-changeset \
    --template-file ~/repo/cloudformation/${1}-resources-${2}.yml \
    --stack-name ${STACK_NAME}-resources-${1} \
    --parameter-overrides Environment=${1}
}

case $0 in
  deploy_infra)
    run_cf_deploy($1)
    ;;
  *)
    echo "Error: Unrecognized command."
    exit 1
    ;;
esac
