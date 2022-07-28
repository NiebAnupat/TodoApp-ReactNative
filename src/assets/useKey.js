var key = 0;

export const keyChange = () => {
      key++;
}

export const useKey = () => {
      keyChange();
      return key;
}
