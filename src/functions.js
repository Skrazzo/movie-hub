function object_to_urlsearchparams(obj) {
	const params = new URLSearchParams();
  
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			params.append(key, obj[key]);
		}
	}
  
	return params;
}


// html form, to javascript object
function get_form_object(formId) {
	const form = document.getElementById(formId);
	const formData = new FormData(form);
	const formDataObject = {};
  
	for (const [key, value] of formData.entries()) {
	  	formDataObject[key] = value;
	}
  
	return formDataObject;
}

function form_to_obj(formId){
    return object_to_urlsearchparams(get_form_object(formId));
}

export {object_to_urlsearchparams, get_form_object, form_to_obj};