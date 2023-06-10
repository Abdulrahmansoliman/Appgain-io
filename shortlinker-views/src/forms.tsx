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
        primary: undefined,
        fallback: undefined,
      },
      android: {
        primary: undefined,
        fallback: undefined,
      },
      web:undefined,
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const [newLink, setNewLink] = useState<CardPros | null>();
  const [responseError, setResponseError] = useState("");

  const onSubmit = (formdata: createFormValues) => {
    console.log(formdata);
    fetch("https://shortlinker.onrender.com/shortlinks/", {
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
            <h3>Slug</h3>
            <p>{newLink.slug}</p> 
            <h3>Android</h3>
            <h4>Android Fallback:</h4> {newLink.android.fallback}   
            <h4>Android Primary:</h4> {newLink.android.primary} 
            <h3>IOS</h3>    
            <h3>IOS Fallback:</h3>{newLink.ios.fallback}    
            <h3>IOS Primary:</h3> {newLink.ios.primary}    
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
    primary: string|undefined;
    fallback: string|undefined;
  };
  android: {
    primary: string|undefined;
    fallback: string|undefined;
  };
};

export const PutForm = () => {
  
  const form = useForm<putFormValues>({
    defaultValues: {
      slug: undefined,
      ios: {
        primary: undefined,
        fallback: undefined,
      },
      android: {
        primary: undefined,
        fallback: undefined,
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
  console.log(formdata)
  const body = {
    slug: formdata.slug,
    ios: formdata.ios ? {
      primary: formdata.ios.primary?formdata.ios.primary:undefined,
      fallback: formdata.ios.fallback?formdata.ios.fallback:undefined
    } : undefined, 
    android: formdata.android? {
      primary: formdata.android.primary?formdata.android.primary:undefined,
      fallback: formdata.android.fallback?formdata.android.fallback:undefined
    } : undefined,
  };

  fetch(`https://shortlinker.onrender.com/shortlinks/${custom_slug}`, {
    method: "PUT",  
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
.then(async response => {
    if (response.status === 201) {
      console.log("Item updated successfully!");
      return response.json();
    } else {
      setResponseError((await response.json()).error);
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
    setValue("android.primary", undefined);
    setAndroidPrimaryVisible(e.target.checked);
  };

  const handleAndroidFallbackChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("android.fallback", undefined);
    setAndroidFallbackVisible(e.target.checked);
  };

  const handleIOSPrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("ios.primary", undefined);
    setIosPrimaryVisible(e.target.checked);
  };

  const handleIOSFallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("ios.fallback", undefined);
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
          placeholder="write space to remove"
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
          placeholder="write space to remove"
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
          placeholder="write space to remove"
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
          placeholder="write space to remove"
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
            <h4>Fallback: <p>{newLink.android.fallback}</p></h4>   
            <h4>Primary: <p>{newLink.android.primary}</p> </h4>  
            <h3>IOS</h3>    
            <h3> Fallback: <p>{newLink.ios.fallback}</p></h3>    
            <h3>Primary: <p>{newLink.ios.primary}</p></h3>    
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