export const request = async (url, method, data = undefined, headerOptions) => {
    try {
      const headers = headerOptions || {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
  
      const options = {
        headers,
        method,
      };
  
      if (data) options.body = data;
  
      const result = await fetch(url, options).then(((res) => res.json()));
  
      return result;
    } catch (error) {
      console.log('ERROR MESSAGE: ', error.message);
    }
  };