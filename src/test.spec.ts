requireAll((require as any).context('./', true, /\.(spec|feature).ts$/))
function requireAll(r: any): any {
    r.keys().forEach(r)
}
