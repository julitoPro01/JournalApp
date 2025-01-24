
export const PostFileImage=async(file)=>{
    try{

        if(!file) throw new Error("imagen no cargada ( imagen )")
        
        const url = "https://api.cloudinary.com/v1_1/dvdvuaykl/upload";
        
        const data = new FormData();
        data.append('upload_preset','journal-app');
        data.append('file',file);;
        
        const resp = await fetch(url,{
            method:"POST",
            body:data
        });

        if(!resp.ok) throw new Error("error al subir ( imagen )");

        const list = await resp.json();

        
        return {ok:true,urlImg:list.secure_url}
    }catch(e){
        throw Error(e)
    }

}