using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ToDoList.Server.Services
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "MyAuthClient";
        const string KEY = "Bf9ag8BB01y7HlWLERLZfDadvg78jBCa";
        const string RefreshKEY = "05c2635cd73ddba03b64dac85c1bbdbb";
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        public static SymmetricSecurityKey GetRefreshSymmetricSecurityKey() =>
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(RefreshKEY));

    }
}
