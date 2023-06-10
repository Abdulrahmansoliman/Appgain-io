import { useState } from "react";
import { useForm } from "react-hook-form";
import { CardList} from "./list";

type CardPros = {
  slug: string;
  android: {
    primary: string;
    fallback: string;
  };
  ios: {
    primary: string;
    fallback: string;
  };
  web: string;
};
export const GetForm = () => {
  return (
    <div>
      <CardList />
    </div>
  );
};

type createFormValues = {
  ios: {
    primary: string;
    fallback: string;
  };
  android: {
    primary: string;
    fallback: string;
  };
  web: string;
};
export const CreateForm = () => {
  const form = useForm<createFormValues>({
    defaultValues: {
      ios: {
        primary: "",
        fallback: "",
      },
      android: {
        primary: "",
        fallback: "",
      },
      web: "",
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const [newLink, setNewLink] = useState<CardPros | null>();
  const [responseError, setResponseError] = useState("");

  const onSubmit = (formdata: createFormValues) => {
    console.log(formdata);
    fetch("http://127.0.0.1:5000/shortlinks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => {
        console.log(response);
        console.log("Item registered successfully!");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNewLink(data);
      })
      .catch((error) => {
        console.error("Failed to register item.", error);
        setResponseError("Failed to register item.");
      });
  };

  const handleReset = () => {
    reset(); // Reset the form values
    setNewLink(null); // Reset the new link
    setResponseError("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="web">Web</label>
        <input
          type="text"
          placeholder="enter web"
          id="web"
          {...register("web", { required: true })}
        />
        {errors?.web && <p className="error">Web is required.</p>}

        <h3>Android</h3>
        <label htmlFor="android-primary">Primary</label>
        <input
          type="text"
          placeholder="enter android primary"
          id="android-primary"
          {...register("android.primary", { required: true })}
        />
        {errors?.android?.primary && (
          <p className="error">Android primary is required.</p>
        )}

        <label htmlFor="android-fallback">Fallback</label>
        <input
          type="text"
          placeholder="enter android fallback"
          id="android-fallback"
          {...register("android.fallback", { required: true })}
        />
        {errors?.android?.fallback && (
          <p className="error">Android fallback is required.</p>
        )}

        <h3>IOS</h3>
        <label htmlFor="ios-primary">Primary</label>
        <input
          type="text"
          placeholder="enter ios primary"
          id="ios-primary"
          {...register("ios.primary", { required: true })}
        />
        {errors?.ios?.primary && (
          <p className="error">IOS primary is required.</p>
        )}

        <label htmlFor="ios-fallback">Fallback</label>
        <input
          type="text"
          placeholder="enter ios fallback"
          id="ios-fallback"
          {...register("ios.fallback", { required: true })}
        />
        {errors?.ios?.fallback && (
          <p className="error">IOS fallback is required.</p>
        )}
        <div>
          <button type="submit">Submit Create</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {newLink && (
        <div>
          <h2>Response:</h2>
          <h3> Slug </h3>
          <p>{newLink.slug}</p>
          <h3> Android </h3>
          <p>{newLink.android.fallback}</p>
          <p>{newLink.android.primary}</p>
          <h3> IOS </h3>
          <p>{newLink.ios.fallback}</p>
          <p>{newLink.ios.primary}</p>
          <h3> Web </h3>
          <p>{newLink.web}</p>
        </div>
      )}

      {responseError && (
        <div>
          <h2>Error:</h2>
          <p>{responseError}</p>
        </div>
      )}
    </div>
  );
  
};

type putFormValues = {
  slug: string;
  ios: {
    primary: string;
    fallback: string;
  };
  android: {
    primary: string;
    fallback: string;
  };
};

export const PutForm = () => {
  
  const form = useForm<putFormValues>({
    defaultValues: {
      slug: "",
      ios: {
        primary: "_",
        fallback: "_",
      },
      android: {
        primary: "_",
        fallback: "_",
      },
    },
  });
  const { register, handleSubmit, formState, setValue, reset } = form;
  const { errors } = formState;

  const [newLink, setNewLink] = useState<CardPros | null>();
  const [responseError, setResponseError] = useState("");

  const [androidPrimaryVisible, setAndroidPrimaryVisible] = useState(false);
  const [androidFallbackVisible, setAndroidFallbackVisible] = useState(false);
  const [iosPrimaryVisible, setIosPrimaryVisible] = useState(false);
  const [iosFallbackVisible, setIosFallbackVisible] = useState(false);

  const onSubmit = (formdata: putFormValues) => {
  let custom_slug = formdata.slug;
  const body = {
    slug: formdata.slug,
    ios: formdata.ios.primary || formdata.ios.fallback ? {
      primary: formdata.ios.primary,
      fallback: formdata.ios.fallback
    } : undefined, 
    android: formdata.android.primary || formdata.android.fallback ? {
      primary: formdata.android.primary,
      fallback: formdata.android.fallback
    } : undefined,
  };

  fetch(`http://127.0.0.1:5000/shortlinks/${custom_slug}`, {
    method: "PUT",  
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(response => {
    if (response.status === 201) {
      console.log("Item updated successfully!");
      return response.json();
    } else {
      setResponseError(response.statusText);
    }
  })
  .then(data => {
    console.log(data);
    setNewLink(data);
  })
  .catch(error => {
    if (error.response.status >= 400 && error.response.status < 600) {
      setResponseError(error.response.statusText);
    } else {
      console.error("Failed to update item.", error);
    } 
  })
};

  const handleAndroidPrimaryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("android.primary", e.target.checked ? "" : "_");
    setAndroidPrimaryVisible(e.target.checked);
  };

  const handleAndroidFallbackChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("android.fallback", e.target.checked ? "" : "_");
    setAndroidFallbackVisible(e.target.checked);
  };

  const handleIOSPrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("ios.primary", e.target.checked ? "" : "_");
    setIosPrimaryVisible(e.target.checked);
  };

  const handleIOSFallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("ios.fallback", e.target.checked ? "" : "_");
    setIosFallbackVisible(e.target.checked);
  };

  const handleReset = () => {
    reset(); // Reset the form values
    setNewLink(null); // Reset the new link
    setResponseError("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          placeholder="Enter Slug"
          id="slug"
          {...register("slug", { required: true })}
        />
        {errors.slug && <p className="error">Slug is required.</p>}

        <h3>Android</h3>
        <label htmlFor="android-primary">Primary</label>
        <input
          type="text"
          placeholder="enter android primary, leave it empty to remove"
          id="android-primary"
          {...register("android.primary")}
          style={{ display: androidPrimaryVisible ? "block" : "none" }}
        />
        <input
          type="checkbox"
          onChange={handleAndroidPrimaryChange}
          checked={androidPrimaryVisible}
        />

        <label htmlFor="android-fallback">Fallback</label>
        <input
          type="text"
          placeholder="enter android fallback, leave it empty to remove"
          id="android-fallback"
          {...register("android.fallback")}
          style={{ display: androidFallbackVisible ? "block" : "none" }}
        />
        <input
          type="checkbox"
          onChange={handleAndroidFallbackChange}
          checked={androidFallbackVisible}
        />

        <h3>IOS</h3>
        <label htmlFor="ios-primary">Primary</label>
        <input
          type="text"
          placeholder="enter ios primary, leave it empty to remove"
          id="ios-primary"
          {...register("ios.primary")}
          style={{ display: iosPrimaryVisible ? "block" : "none" }}
        />
        <input
          type="checkbox"
          onChange={handleIOSPrimaryChange}
          checked={iosPrimaryVisible}
        />

        <label htmlFor="ios-fallback">Fallback</label>
        <input
          type="text"
          placeholder="enter ios fallback, leave it empty to remove"
          id="ios-fallback"
          {...register("ios.fallback")}
          style={{ display: iosFallbackVisible ? "block" : "none" }}
        />
        <input
          type="checkbox"
          onChange={handleIOSFallbackChange}
          checked={iosFallbackVisible}
        />

        <div>
          <button type="submit">Submit Put</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      <div>
        {newLink && (
          <div>
            <h2>Response:</h2>
            <h3>Slug</h3>
            <p>{newLink.slug}</p> 
            <h3>Android</h3>
            <p>{newLink.android.fallback}</p>   
            <p>{newLink.android.primary}</p>   
            <h3>IOS</h3>    
            <p>{newLink.ios.fallback}</p>    
            <p>{newLink.ios.primary}</p>    
          </div>
        )}

        {responseError && (
          <div>
            <h2>Error:</h2>
            <p>{responseError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

