using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ToDoList.Server.Services
{
    public interface IJwtService
    {
        string GenerateToken(string userLogin);
        string GenerateRefreshToken(string userLogin);
    }
    public class JwtService : IJwtService
    {
        public string GenerateToken(string userLogin)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, userLogin), new Claim(JwtRegisteredClaimNames.Typ, "jwt") };

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(15)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public string GenerateRefreshToken(string userLogin)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, userLogin), new Claim(JwtRegisteredClaimNames.Typ, "refresh") };

            var refreshtoken = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromDays(5)),
                signingCredentials: new SigningCredentials(AuthOptions.GetRefreshSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );
            return new JwtSecurityTokenHandler().WriteToken(refreshtoken);
        }
    }
}
