// @ts-ignore
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { toast } from "react-toastify";

export const API_GET = async (url_post) => {
  const URL = BASE_URL + url_post;
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Network Responce was not ok");
    }
    const result = await res.json();
    const status = res.status;
    return { result, status };
  } catch (error) {
    console.error("Api Error: " + error.message);
  }
};

export const API_POST = async (url_post, body) => {
  const URL = BASE_URL + url_post;

  const res = await fetch(URL, {
    method: "POST",
    body: body, 
  });

  if (!res.ok) {
    throw new Error("Network Response was not ok");
  }

  const result = await res.json();
  const status = res.status;

  return { result, status };
};

export const API_POST1 = async (url_post, body) => {
  const URL = BASE_URL + url_post;

  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Ensure the correct content type
    },
    body: JSON.stringify(body), // Use the body parameter
  });

  if (!res.ok) {
    throw new Error("Network Response was not ok");
  }

  const result = await res.json();
  const status = res.status;

  return { result, status };
};



export const API_POST_AUTH = async (url_post, body, token) => {
  const URL = BASE_URL + url_post;

  const res = fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!(await res).ok) {
    throw new Error("Network Responce was not ok");
  }
  const result = (await res).json();
  const status = (await res).status;
  return { result, status };
};

// export const API_POST_CITY = async (url, body) => {
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   if (!res.ok) {
//     throw new Error("Network Responce was not ok");
//   }
//   const result = await res.json();
//   const status = res.status;
//   // console.log(JSON.stringify(result));

//   return { result, status };
//   // return result
// };

export const API_POST_PIC = async (url_post, body) => {
  const URL = BASE_URL + url_post;
  try {
    const res = await fetch(URL, {
      method: "POST",
      body: body,
    });
    if (!res.ok) {
      throw new Error("Network Responce was not ok");
    }
    const result = await res.json();
    const status = res.status;

    return { result, status };
  } catch (error) {
    console.error("error: " + error.message);
  }
};

export const API_DELETE = async (url_post) => {
  const URL = BASE_URL + url_post;
  try {
    const res = await fetch(URL, {
      method: "DELETE",
    });
    const result = await res.json();
    const status = res.status;

    return { result, status };
  } catch (error) {
    console.error("Error: " + error.message);
  }
};

export const API_PATCH_AUTH = async (url_post, body, token) => {
  const URL = BASE_URL + url_post;

  const res = await fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Network Responce was not ok");
  }
  const result = await res.json();
  const status = res.status;
  return { result, status };
};

export const API_POST_APPLY = async (url_post, body) => {
  try {
    const URL = BASE_URL + url_post;

    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    if (res.status == 200) {
      toast.success("Job Applied", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (res.status == 409) {
      toast.warn("Job Already Applied", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    return { result };
  } catch (error) {
    console.error("Error: " + error.message);
  }
};

export const API_POST_LIKE = async (url_post, body) => {
  try {
    const URL = BASE_URL + url_post;

    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    if (res.status == 200) {
      toast.success("Job Liked", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      }); 
    } else if (res.status == 409) {
      toast.warn("Job Already Liked", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    return { result };
  } catch (error) {
    console.error("Error: " + error.message);
  }
};

export const API_POST_LOGIN = async (url_post, body) => {
  try {
    const URL = BASE_URL + url_post;

    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const result = await res.json();
    const status = res.status;
    if (res.status == 400) {
      toast.warn("No User Found", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (res.status == 422) {
      toast.warn("Email and Password Required", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (res.status == 401) {
      toast.warn("Invalid Credentials!", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    return { result, status };
  } catch (error) {
    console.error("Error: " + error.message);
  }
};

export const API_POST_STUDENT = async (url_post, body, p0) => {
  const URL = BASE_URL + url_post;

  const res = await fetch(URL, {
    method: "POST",
    body: body, // ✅ FormData should be passed directly
  });

  if (!res.ok) {
    throw new Error("Network Response was not ok");
  }

  const result = await res.json();
  const status = res.status;

  return { result, status };
};


export const API_POST_REGISTER = async (url_post, body) => {
  try {
    const URL = BASE_URL + url_post;

    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    const status = res.status;
    if (res.status == 400) {
      toast.warn("No User Found", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (res.status == 422) {
      toast.warn("Details Required", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (res.status == 401) {
      toast.warn("Invalid Credentials!", {
        position: "top-center",
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    return { result, status };
  } catch (error) {
    console.error("Error: " + error.message);
  }
};
// src/utils/api_structure.tsx
export const API_PUT = async (url_post, body, token = null) => {
  const URL = BASE_URL + url_post;

  try {
    const res = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await res.json();
    const status = res.status;
    return { result, status };
  } catch (error) {
    console.error("Error: " + error.message);
    toast.error("Failed to update resource", {
      position: "top-center",
      theme: "light",
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
};

