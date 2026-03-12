# Felipe_Garrido_Tirado_Tarea1
Respuestas tarea 1
A - JSON.
B - En la URL (/posts/1) y en el cuerpo de la respuesta ("id": 1).
C - No, curl por defecto solo muestra el cuerpo y oculta el código de estado.
D - "OK". Indica que la petición se procesó con éxito.
E - Éxito (familia de códigos 2xx).
F - 404 (No encontrado), 500 (Error interno), 400 (Mala petición), 201 (Creado).
G - El cliente (como un navegador) lo interpretaría como una página web HTML en lugar de datos de una API.
H - Sí, indica el tamaño exacto del cuerpo en bytes.
I - Permite reutilizar la conexión de red (keep-alive), ahorrando recursos al evitar abrir conexiones nuevas constantemente.
J - 404 Not Found.
K - Sí, devuelve un objeto JSON vacío ({}).
L - El código indica un error del cliente (4xx) y no devuelve los datos esperados porque no existe el recurso.
M - 201 Created.
N - La petición POST fue exitosa y se creó un nuevo recurso en el servidor.
O - Content-Type, Location y Content-Length.
P - No, al ser una API de pruebas ignora el token y responde con éxito.
Q - 401 Unauthorized.
R - 401 es falta de autenticación (no sabe quién eres); 403 es falta de permisos (sabe quién eres, pero no estás autorizado).
S - Para comprobar si un recurso existe o ver sus metadatos sin gastar ancho de banda descargando todo su contenido.
T - Para verificar rápidamente y con bajo consumo de red si un servidor está en línea.

U - Tabla completada:
| Código | Categoría | Significado |
| 200 | Success | OK. La acción fue recibida, entendida y aceptada. |
| 201 | Success | Created. La solicitud resultó en la creación de un nuevo recurso. |
| 400 | Client Error | Bad Request. Error del cliente (ej. sintaxis malformada). |
| 401 | Client Error | Unauthorized. Falta autenticación o es inválida. |
| 403 | Client Error | Forbidden. El cliente no tiene los permisos necesarios. |
| 404 | Client Error | Not Found. El recurso solicitado no se pudo encontrar. |
| 500 | Server Error | Internal Server Error. Error inesperado por parte del servidor. |

V - Rompe el estándar HTTP; oculta los errores a los clientes y sistemas de monitoreo, impidiendo el manejo automático de fallos y complicando la depuración.
