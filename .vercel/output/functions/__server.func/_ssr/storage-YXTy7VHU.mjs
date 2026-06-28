import { t as supabase } from "./client-DfK1yIpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storage-YXTy7VHU.js
var BUCKET = "saloree-media";
var storage = { async upload(file, { userId, folder, bucket = BUCKET }) {
	const ext = file.name.split(".").pop() || "bin";
	const path = `${userId}/${folder}/${crypto.randomUUID()}.${ext}`;
	const { error } = await supabase.storage.from(bucket).upload(path, file, {
		cacheControl: "3600",
		upsert: false
	});
	if (error) throw error;
	const { data } = supabase.storage.from(bucket).getPublicUrl(path);
	return data.publicUrl;
} };
//#endregion
export { storage as t };
