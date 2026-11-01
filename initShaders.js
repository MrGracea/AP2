function initShaders(gl, vShaderSource, fShaderSource) {
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!ok) {
            console.error("着色器编译失败：", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vShader = createShader(gl, gl.VERTEX_SHADER, vShaderSource);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fShaderSource);
    if (!vShader || !fShader) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        console.error("程序链接失败：", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
        return null;
    }
    return program;
}
